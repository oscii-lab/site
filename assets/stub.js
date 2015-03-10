var data = {
  'en': {
    'master': [
      { term: 'master', pos: 'verb', translation: 'dominar', score: 0.78 },
      { term: 'master', pos: 'verb', translation: 'vencer', score: 0.38 },
      { term: 'master', pos: 'noun', translation: 'maestro', score: 0.71 },
      { term: 'master', pos: 'noun', translation: 'profesor', score: 0.38 },
      { term: 'master', pos: 'noun', translation: 'señor', score: 0.58 },
      { term: 'master', pos: 'noun', translation: 'jefe', score: 0.54 },
      { term: 'master', pos: 'noun', translation: 'patrón', score: 0.35 },
      { term: 'master', pos: 'noun', translation: 'director', score: 0.31 }
    ]
  },
  'es': {
    'dominar': [
      { term: 'dominar', pos: 'verb', translation: 'master', score: 0.78 },
      { term: 'dominar', pos: 'verb', translation: 'dominate', score: 0.73 }
    ],
    'vencer': [
      { term: 'vencer', pos: 'verb', translation: 'overcome', score: 0.78 },
      { term: 'vencer', pos: 'verb', translation: 'beat', score: 0.75 },
      { term: 'vencer', pos: 'verb', translation: 'defeat', score: 0.71 },
      { term: 'vencer', pos: 'verb', translation: 'win', score: 0.38 },
      { term: 'vencer', pos: 'verb', translation: 'conquer', score: 0.31 }
    ],
    'maestro': [
      { term: 'maestro', pos: 'noun', translation: 'master', score: 0.75 },
      { term: 'maestro', pos: 'adjective', translation: 'master', score: 0.71 },
      { term: 'maestro', pos: 'noun', translation: 'teacher', score: 0.78 },
    ],
    'profesor': [
      { term: 'profesor', pos: 'noun', translation: 'teacher', score: 0.78 },
      { term: 'profesor', pos: 'noun', translation: 'professor', score: 0.71 },
      { term: 'profesor', pos: 'noun', translation: 'lecturer', score: 0.55 },
    ],
    'señor': [
      { term: 'señor', pos: 'noun', translation: 'sir', score: 0.78 },
      { term: 'señor', pos: 'noun', translation: 'lord', score: 0.71 },
      { term: 'señor', pos: 'noun', translation: 'master', score: 0.58 },
      { term: 'señor', pos: 'noun', translation: 'gentleman', score: 0.56 },
      { term: 'señor', pos: 'noun', translation: 'man', score: 0.55 },
      { term: 'señor', pos: 'noun', translation: 'mister', score: 0.53 },
      { term: 'señor', pos: 'abbreviation', translation: 'lecturer', score: 0.75 }
    ],
    'jefe': [
      { term: 'jefe', pos: 'noun', translation: 'head', score: 0.78 },
      { term: 'jefe', pos: 'noun', translation: 'chief', score: 0.79 },
      { term: 'jefe', pos: 'noun', translation: 'boss', score: 0.75 },
      { term: 'jefe', pos: 'noun', translation: 'leader', score: 0.58 },
      { term: 'jefe', pos: 'noun', translation: 'manager', score: 0.55 }
    ],
    'patrón': [
      { term: 'patrón', pos: 'noun', translation: 'pattern', score: 0.78 },
      { term: 'patrón', pos: 'noun', translation: 'patron', score: 0.76 },
      { term: 'patrón', pos: 'noun', translation: 'standard', score: 0.74 },
      { term: 'patrón', pos: 'noun', translation: 'employer', score: 0.72 },
      { term: 'patrón', pos: 'noun', translation: 'skipper', score: 0.55 }
    ],
    'director': [
      { term: 'director', pos: 'noun', translation: 'manager', score: 0.72 },
      { term: 'director', pos: 'noun', translation: 'principle', score: 0.58 },
      { term: 'director', pos: 'noun', translation: 'head', score: 0.52 }
    ]
  }
};

$.getJSON = function(path, params, callback) {
  var source = params['source'];
  var query = params['query'];
  var response = { translation: data[source][query] || [] };
  _.defer(function() {
    callback(response);
  });
};
