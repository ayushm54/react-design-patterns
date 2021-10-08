import React, { useState } from "react";

export const UncontrolledOnboardingFlow = ({ children, onFinished }) => {
  const [onBoardingData, setOnBoardingData] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentChild = React.Children.toArray(children)[currentIndex];

  const goToNext = (stepData) => {
    const nextIndex = currentIndex + 1;

    const updatedData = { ...onBoardingData, ...stepData };

    console.log(updatedData);

    if (nextIndex < children.length) {
      setCurrentIndex(nextIndex);
    } else {
      onFinished(updatedData);
    }
    setOnBoardingData(updatedData);
  };

  if (React.isValidElement(currentChild)) {
    return React.cloneElement(currentChild, { goToNext });
  }
  return currentChild;
};
