(() => {
  'use strict';

  // See wiki for reference
  const maxTanninPerLInGram = 0.160;
  const pectinaseInGPerL = 0.4362;

  // Conversions Parameters
  const ppmToG = 1 / 1000;
  const poundsInKg = 2.20462;
  const litresInGal = 3.78541;
  const metabisulfiteToSulfDioxEfficiency = 0.57;

  // Others
  const maxScale = 10;

  // -----------------------------------------------  Listeners  -------------------------------------------------------
  function _nutrientAddInG(volumeInL) {
    console.log('recipe received _nutrientAddInG', volumeInL);
  }


  /**
   * Computes a PH correction based on ascorbic acid.
   *
   * Make sure the arguments are exactly in the same order as the helper function.
   * @see https://github.com/malavv/c1d3r/wiki/PH-Correction
   *
   * @param oPh Original PH of the solution.
   * @param fPh Final PH of the solution.
   * @param volumeL Solution volume in liters.
   * @param pka Chosen Acid Pka
   * @param molarMass Molar mass of the chosen acid.
   * @return Mass of the acid to add to achieve the final PH.
   */
  function _getAcidAddInG(oPh, fPh, volumeL, pka, molarMass) {
    let
        // Required change in hydronium concentration.
        deltaMol = phToH30(fPh) - phToH30(oPh),
        acidAddInMol = (deltaMol * deltaMol) / phToH30(pka) + deltaMol;
    return acidAddInMol * volumeL * molarMass;
  }
})();