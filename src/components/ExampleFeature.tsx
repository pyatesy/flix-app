import React from 'react';
import { useFeatureFlag } from '../hooks/useFeatureFlag';

interface ExampleFeatureProps {
  userId?: string;
}

const ExampleFeature: React.FC<ExampleFeatureProps> = ({ userId }) => {
  const { isEnabled, variables } = useFeatureFlag('my_feature_key');

  if (!isEnabled) {
    return null;
  }

  return (
    <div>
      <h2>Feature is enabled!</h2>
      {variables && (
        <div>
          <p>Feature variables:</p>
          <pre>{JSON.stringify(variables, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ExampleFeature; 