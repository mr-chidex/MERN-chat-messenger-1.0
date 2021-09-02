import React, { useEffect, useState, memo } from "react";

const Alerts = memo(({ message, type }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {visible ? <div className={`alert alert--${type}`}>{message}</div> : null}
    </>
  );
});

export default Alerts;
