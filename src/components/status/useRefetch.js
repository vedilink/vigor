import { useState, useEffect } from "react";
import moment from "moment";

export default (refetch, updateTimeAgoDep) => {
  const [timeAgo, setTimeAgo] = useState(
    moment(
      new Date(localStorage.getItem(`vigorStatusLastFetchcomponent`))
    ).fromNow()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        new Date(localStorage.getItem(`vigorStatusLastFetchcomponent`)) <
        new Date() - 240000
      ) {
        refetch(() => {
          setTimeAgo(
            moment(
              new Date(localStorage.getItem(`vigorStatusLastFetchcomponent`))
            ).fromNow()
          );
        });
      } else {
        setTimeAgo(
          moment(
            new Date(localStorage.getItem(`vigorStatusLastFetchcomponent`))
          ).fromNow()
        );
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [refetch]);

  useEffect(() => {
    setTimeAgo(
      moment(
        new Date(localStorage.getItem(`vigorStatusLastFetchcomponent`))
      ).fromNow()
    );
  }, [updateTimeAgoDep]);

  return [timeAgo];
};
