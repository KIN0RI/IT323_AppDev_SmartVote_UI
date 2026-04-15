import { useState, useEffect } from "react";
import api from "../api";

function useVoterLog() {
  const [logs, setLogs]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const params = {};
    if (search) params.search = search;
    if (filter !== "All") params.status = filter;
    setLoading(true);
    api.get("/voter-log/", { params })
      .then((res) => setLogs(res.data))
      .catch(() => setLogs([]))
      .finally(() => setLoading(false));
  }, [search, filter]);

  return { logs, loading, search, setSearch, filter, setFilter };
}

export default useVoterLog;
