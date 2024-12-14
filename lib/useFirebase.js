import React, { useEffect, useState } from "react";

const useFirebase = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    await fn()
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const reFetch = () => fetchData();

  return { data, isLoading, reFetch };
};

export default useFirebase;
