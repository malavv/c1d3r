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

  return {
    _acidAddInG(juicePh, finalPh, volumeInL, acidPka, acidMolarMass) {
      console.info('_acidAddInG', arguments);
      return 4.00;
    },
    _addedVolumeOfSugarAddInL(og, chaptizationSugarAddKg, volumeInL, tg) {
      console.info('_addedVolumeOfSugarAddInL', arguments);
      return 0.75;
    },
    _chaptizationSugarAddKg(degreeAlcohol, yeastEfficiency, og, sugarYieldPtsKgL, volumeInL) {
      console.info('_chaptizationSugarAddKg', arguments);
      return 1.50;
    },
    _nutrientAddInG(volumeInL) {
      console.info('_nutrientAddInG', arguments);
      return 3.00;
    },
    _pectinaseAddInG(volumeInL) {
      console.info('_pectinaseAddInG', arguments);
      return 4.00;
    },
    _potassiumMetaAddInG(juicePh, finalPh, volumeInL) {
      console.info('_potassiumMetaAddInG', arguments);
      return 5.00;
    },
    _primingSugarAddKg(sugarPpg, volumeInL) {
      console.info('_primingSugarAddKg', arguments);
      return 0.127;
    },
    _sugarYieldPtsKgL(sugarPpg) {
      console.info('_sugarYieldPtsKgL', arguments);
      return 46;
    },
    _tanninAddInG(origTanninLvl, desiredTanninLvl, volumeInL) {
      console.info('_tanninAddInG', arguments);
      return 4.00;
    },
    _tg(og, sugarYieldPtsKgL, chaptizationSugarAddKg, volumeInL) {
      console.info('og', arguments);
      return 1.023;
    }
  }
})();
