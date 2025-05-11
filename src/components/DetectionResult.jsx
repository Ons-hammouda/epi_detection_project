import React from 'react';

const DetectionResult = ({ result, annotatedImage }) => {
  return (
    <div>
      {annotatedImage && <img src={annotatedImage} alt="annotated" />}
      <h3>
        Résultat : {result === 'ok' ? '✅ Conforme' : '❌ Infraction'}
      </h3>
    </div>
  );
};

export default DetectionResult;
