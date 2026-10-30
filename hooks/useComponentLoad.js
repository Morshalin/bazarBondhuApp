import React from "react";

export default function useComponentLoad() {
  const [isComponentLoad, setIsComponentLoad] = React.useState(false);

  React.useEffect(() => {
    setIsComponentLoad(true);
  }, []);

  return {
    isComponentLoad,
  };
}
