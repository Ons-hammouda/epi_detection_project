import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import DetectionResult from './components/DetectionResult';
import AlertNotification from './components/AlertNotification';
import DetectionHistory from './components/DetectionHistory';
import axios from 'axios';

const App = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [annotatedImage, setAnnotatedImage] = useState(null);
  const [alert, setAlert] = useState(false);
  const [history, setHistory] = useState([]);

  const handleImageUpload = (file) => {
    setImage(file);
    // TODO: Envoyer vers API et recevoir le résultat
  };

  const handleAnalyse = () => {
    // Simulation temporaire
    const fakeResult = Math.random() > 0.5 ? 'ok' : 'infraction';
    const fakeAnnotated = URL.createObjectURL(image);

    setResult(fakeResult);
    setAnnotatedImage(fakeAnnotated);
    setAlert(fakeResult === 'infraction');

    setHistory(prev => [
      { imageUrl: fakeAnnotated, result: fakeResult, date: new Date().toLocaleString() },
      ...prev,
    ]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>🧠 Détection EPI</h1>
      <ImageUpload onImageUpload={handleImageUpload} />
      <button onClick={handleAnalyse} disabled={!image}>Analyser</button>
      <DetectionResult result={result} annotatedImage={annotatedImage} />
      <AlertNotification show={alert} />
      <DetectionHistory history={history} />
    </div>
  );
};

const handleAnalyse = async () => {
  const formData = new FormData();
  formData.append('file', image);

  try {
    const response = await axios.post('http://localhost:8000/detect/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const { result, annotated_image_url } = response.data;

    setResult(result);
    setAnnotatedImage(annotated_image_url);
    setAlert(result === 'infraction');

    setHistory(prev => [
      { imageUrl: annotated_image_url, result, date: new Date().toLocaleString() },
      ...prev,
    ]);
  } catch (error) {
    console.error('Erreur API:', error);
  }
};

export default App;
