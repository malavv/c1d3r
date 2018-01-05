(() => {
  'use strict';

  // See wiki for reference
  const maxTanninPerLInGram = 0.160;
  const pectinaseInGPerL = 0.4362;
  const yeastNutrientInGPerL = 0.21794;

  // Conversions Parameters
  const ppmToG = 1 / 1000;
  const poundsInKg = 2.20462;
  const litresInGal = 3.78541;
  const metabisulfiteToSulfDioxEfficiency = 0.57;

  // Others
  const maxScale = 10;

  /**
   * Gets the molar quantity of hydronium from a pH.
   *
   * @param {number} pH pH magnitude
   * @returns {number}
   */
  function phToH30(pH) {
    return Math.pow(10, -pH);
  }

  /**
   * Gets the required ppm of SO2 when given a pH.
   * @param {number} pH pH of the solution.
   * @returns {number}
   */
  function phToSO2Ppm(pH) {
    return 52.7 * (pH*pH*pH) - 459 * (pH*pH) + 1352.6 * pH - 1338.6;
  }

  /**
   * //FIXME(malavv): Move this.
   */
  class IllegalArgumentError extends Error {
    constructor(message) {
      super(message);
      this.message = message;
      this.name = 'IllegalArgumentError';
    }
  }
  class IllegalStateError extends Error {
    constructor(message) {
      super(message);
      this.message = message;
      this.name = 'IllegalStateError';
    }
  }

  return {
    /**
     * Computes an weak acid correction.
     *
     * @see https://github.com/malavv/c1d3r/wiki/PH-Correction
     *
     * @param {number} juicePh Initial pH of the solution
     * @param {number} finalPh Required pH
     * @param {number} volumeInL Volume of solution in Litres
     * @param {number} acidPka pKa value of the acid used.
     * @param {number} acidMolarMass Molar Mass of the acid used.
     * @returns {number|null}
     * @private
     */
    _acidAddInG(juicePh, finalPh, volumeInL, acidPka, acidMolarMass) {
      let
        // Required change in hydronium concentration.
        deltaMol = phToH30(finalPh) - phToH30(juicePh),
        // Finding moles of acid needed for this amount of hydronium concentration
        acidAddInMol = (deltaMol * deltaMol) / phToH30(acidPka) + deltaMol;
        // Grams needed per this amount of volume.
      return acidAddInMol * volumeInL * acidMolarMass;
    },
    /**
     * Computes the additional volume of solution caused by the addition of sugar.
     *
     * @see https://github.com/malavv/c1d3r/wiki/Volume-Correction
     *
     * @param {number} og Initial juice gravity in SG.
     * @param {number} chaptizationSugarAddKg Addition of sugar to increase ABV in kg.
     * @param {number} volumeInL Initial volume of solution.
     * @param {number} tg Gravity after the addition of sugar in SG.
     * @returns {number|null}
     * @private
     */
    _addedVolumeOfSugarAddInL(og, chaptizationSugarAddKg, volumeInL, tg) {
      if (og == null || tg == null || chaptizationSugarAddKg == null || volumeInL == null)
        return null;

      if (og < 1.0 || og > 1.15) throw new IllegalArgumentError('Invalid Original Gravity in SG');
      if (chaptizationSugarAddKg < 0)  throw new IllegalArgumentError('Cannot have negative sugar addition');
      if (volumeInL < 0) throw new IllegalArgumentError('Cannot have negative volume');

      return (og * volumeInL + chaptizationSugarAddKg) / tg;
    },
    /**
     * Calculate how much sugar is needed to achieve the requested ABV level.
     *
     * @see https://github.com/malavv/c1d3r/wiki/Chaptalization
     *
     * @param {number} degreeAlcohol Requested Alcohol per Volume. (%)
     * @param {number} yeastEfficiency Yeast Efficiency (for yeast).
     * @param {number} og Original juice gravity. (SG)
     * @param {number} sugarYieldPtsKgL Sugar Yield in Gravity (pts*Kg*L)
     * @param {number} volumeInL Initial Volume of Solution (L)
     * @returns {number|null}
     * @private
     */
    _chaptizationSugarAddKg(degreeAlcohol, yeastEfficiency, og, sugarYieldPtsKgL, volumeInL) {
      if (degreeAlcohol == null || yeastEfficiency == null || og == null || sugarYieldPtsKgL == null
          || volumeInL == null)
        return null;

      if (degreeAlcohol < 3.0 || degreeAlcohol > 8.0)
        throw new IllegalArgumentError('ABV out of recipe bounds');
      if (yeastEfficiency < 0 || yeastEfficiency > 1.0)
        throw new IllegalArgumentError('Yeast efficiency between 0 and 1');
      if (og < 1.0 || og > 1.15)
        throw new IllegalArgumentError('Invalid Original Gravity in SG');
      if (volumeInL < 0)
        throw new IllegalArgumentError('Cannot have negative volume');

      let neededGravity = (4 * degreeAlcohol) / (525 * yeastEfficiency);
      let currentGravity = og - 1;

      if (neededGravity < currentGravity)
        throw new IllegalStateError('Requested ABV of ' + degreeAlcohol + ' is lower than the juice potential');

      let deltaGravityPts = (neededGravity - currentGravity) * 1000;
      return deltaGravityPts / sugarYieldPtsKgL * volumeInL;
    },
    /**
     * Addition of Yeast Nutrient in grams.
     *
     * @see https://github.com/malavv/c1d3r/wiki/Yeast-Nutrient
     *
     * @param {number} volumeInL Initial volume of solution.
     * @returns {number|null}
     * @private
     */
    _nutrientAddInG(volumeInL) {
      return yeastNutrientInGPerL * volumeInL;
    },
    /**
     * Computes the recommended addition of pectic enzyme (pectinase).
     *
     * This is a fixed amount per Liter in G. This was measured with a precise
     * balance using loose pectinase (do not pack).
     * @see https://github.com/malavv/c1d3r/wiki/Pectic-Enzyme
     *
     * @param {number} volumeInL Solution volume in liters.
     * @return {number|null} Mass of pectinase to add.
     */
    _pectinaseAddInG(volumeInL) {
      if (volumeInL == null)
        return null;

      if (volumeInL < 0)
        throw new IllegalArgumentError('Cannot have negative volume');

      return pectinaseInGPerL * volumeInL;
    },
    /**
     * Computes the addition of potassium metabisulfite in grams.
     *
     * @see https://github.com/malavv/c1d3r/wiki/Potassium-Metabisulfite
     *
     * @param {number} finalPh Final PH of the solution. (post pH correction)
     * @param {number} volumeInL Solution volume. (L)
     * @return {number}
     */
    _potassiumMetaAddInG(finalPh, volumeInL) {
      return phToSO2Ppm(finalPh) * ppmToG * (1 / metabisulfiteToSulfDioxEfficiency) * volumeInL;
    },
    /**
     * Calculating the required amount of table sugar to add for priming in grams.
     *
     * Assuming 2.5 Volumes of CO2 at 20C and Table Sugar.
     * This is not a technical formula, just a bug fix before cider
     * season. This is coming from
     * http://www.brewersfriend.com/beer-priming-calculator/
     *
     * @see https://github.com/malavv/c1d3r/wiki/Priming
     *
     * @param {number} volumeInL Volume of solution (L)
     * @returns {number}
     * @private
     */
    _primingSugarAddKg(volumeInL) {
      return volumeInL * 6.55 / 1000;
    },
    /**
     * Converts a ppg to a more manageable PtsKgL.
     *
     * We normally demand the input directly in metric, but since all standard
     * table provide the ppg value, we accept it as is and than convert it
     * manually.
     *
     * @param {number} sugarPpg Sugar Yield of Milli-Gravity points per pond per gal. (from ref. table)
     * @returns {number|null}
     * @private
     */
    _sugarYieldPtsKgL(sugarPpg) {
      if (sugarPpg == null)
        return null;

      if (sugarPpg < 30 || sugarPpg > 50)
        throw new IllegalArgumentError('Invalid PPG value (30 < x < 50)');

      return sugarPpg * poundsInKg * litresInGal;
    },
    /**
     * Computes the addition of wine tannin in grams.
     *
     * @see https://github.com/malavv/c1d3r/wiki/Tannin
     *
     * @param {number} origTanninLvl Juice tannin levels assessed subjectively from 0 (min) to 10 (max).
     * @param {number} desiredTanninLvl Desired tanning levels from 0 (min) to 10 (max).
     * @param {number} volumeInL Solution volume (L)
     * @return {number | null} Mass of wine tannin to add.
     */
    _tanninAddInG(origTanninLvl, desiredTanninLvl, volumeInL) {
      if (origTanninLvl == null || desiredTanninLvl == null || volumeInL == null)
        return null;

      // Check for assumptions
      if (origTanninLvl < 0 || origTanninLvl > 10)
        throw new IllegalArgumentError('Original tannin level out of scale.');
      if (desiredTanninLvl < 0 || desiredTanninLvl > 10)
        throw new IllegalArgumentError('Original tannin level out of scale.');
      if (volumeInL < 0)
        throw new IllegalArgumentError('Cannot have negative volume');

      // Set new value
      let normalizedDiff = (desiredTanninLvl - origTanninLvl) / maxScale;
      return normalizedDiff * maxTanninPerLInGram * volumeInL;
    },
    /**
     * Total Gravity
     *
     * @param {number} og Original Gravity (SG)
     * @param {number} sugarYieldPtsKgL Gravity points yield of this sugar. (pts*kg*L)
     * @param {number} chaptizationSugarAddKg Addition of sugar for increasing ABV (kg)
     * @param {number} volumeInL Volume of solution (L)
     * @return {number|null}
     * @private
     */
    _tg(og, sugarYieldPtsKgL, chaptizationSugarAddKg, volumeInL) {
      if (og == null || sugarYieldPtsKgL == null || chaptizationSugarAddKg == null || volumeInL == null)
        return null;

      if (og < 1.0 || og > 1.15)
        throw new IllegalArgumentError('Invalid Original Gravity in SG');
      if (chaptizationSugarAddKg < 0)
        throw new IllegalArgumentError('Cannot have negative sugar addition');
      if (volumeInL < 0)
        throw new IllegalArgumentError('Cannot have negative volume');

      return og + ((chaptizationSugarAddKg / volumeInL) * sugarYieldPtsKgL) / 1000;
    }
  }
})();