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
    },
    _addedVolumeOfSugarAddInL(og, chaptizationSugarAddKg, volumeInL, tg) {
      console.info('_addedVolumeOfSugarAddInL', arguments);
    },
    _chaptizationSugarAddKg(degreeAlcohol, yeastEfficiency, og, sugarYieldPtsKgL, volumeInL) {
      console.info('_chaptizationSugarAddKg', arguments);
    },
    _nutrientAddInG(volumeInL) {
      console.info('_nutrientAddInG', arguments);
    },
    _pectinaseAddInG(volumeInL) {
      console.info('_pectinaseAddInG', arguments);
    },
    _potassiumMetaAddInG(juicePh, finalPh, volumeInL) {
      console.info('_potassiumMetaAddInG', arguments);
    },
    _primingSugarAddKg(sugarPpg, volumeInL) {
      console.info('_primingSugarAddKg', arguments);
    },
    _sugarYieldPtsKgL(sugarPpg) {
      console.info('_sugarYieldPtsKgL', arguments);
    },
    _tanninAddInG(origTanninLvl, desiredTanninLvl, volumeInL) {
      console.info('_tanninAddInG', arguments);
    },
    _tg(og, sugarYieldPtsKgL, chaptizationSugarAddKg, volumeInL) {
      console.info('og', arguments);
    }
  }
})();
