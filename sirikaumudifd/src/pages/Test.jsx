import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import QuestionLayout from '../components/test/QuestionLayout';

function Test() {
  const { testId } = useParams();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/test/${testId}`).then((res) => {
      setTest(res.data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, [testId]);

  if (loading) return <p>Loading...</p>;
  if (!test) return <p>Test not found</p>;

  return <QuestionLayout test={test} />;
}

export default Test;