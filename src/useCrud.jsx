import { useState } from "react";
const parseJSON = async (res) => {
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

const fetchDatas = (url) => fetch(url, { mode: "cors" }).then(parseJSON);
const fetchDataById = (url, id) =>
  fetch(`${url}/${id}`, { mode: "cors" }).then(parseJSON);
const createData = (url, data) =>
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    body: JSON.stringify(data),
  }).then(parseJSON);
const updateData = (url, id, data) =>
  fetch(`${url}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    body: JSON.stringify(data),
  }).then(parseJSON);
const deleteData = (url, id) =>
  fetch(`${url}/${id}`, { method: "DELETE", mode: "cors" }).then((res) => {
    if (!res.ok) throw new Error("Delete failed");
    return true;
  });

export default function useCrud(apiUrl) {
  const [data, setData] = useState([]);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const result = await fetchDatas(apiUrl);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const loadOne = async (id) => {
    setLoading(true);
    try {
      const result = await fetchDataById(apiUrl, id);
      setItem(result);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const create = async (obj) => {
    setLoading(true);
    try {
      const result = await createData(apiUrl, obj);
      await load();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, obj) => {
    setLoading(true);
    try {
      const result = await updateData(apiUrl, id, obj);
      await load();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    setLoading(true);
    try {
      await deleteData(apiUrl, id);
      await load();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    item,
    loading,
    error,
    load,
    loadOne,
    create,
    update,
    remove,
  };
}
