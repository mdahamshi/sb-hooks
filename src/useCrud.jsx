import { useState } from "react";
const parseJSON = async (res) => {
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

const fetchDatas = (url) =>
  fetch(url, { mode: "cors", credentials: "include" }).then(parseJSON);
const fetchDataById = (url, id) =>
  fetch(`${url}/${id}`, { mode: "cors", credentials: "include" }).then(
    parseJSON
  );
const createData = (url, data) =>
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    credentials: "include",
    body: JSON.stringify(data),
  }).then(parseJSON);
const updateData = (url, id, data) =>
  fetch(`${url}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    credentials: "include",
    body: JSON.stringify(data),
  }).then(parseJSON);
const deleteData = (url, id) =>
  fetch(`${url}/${id}`, {
    method: "DELETE",
    mode: "cors",
    credentials: "include",
  }).then((res) => {
    if (!res.ok) throw new Error("Delete failed");
    return true;
  });

export default function useCrud(apiUrl) {
  const [data, setData] = useState([]);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async (custom) => {
    setLoading(true);
    try {
      const result = await fetchDatas(custom || apiUrl);
      setData(result);
      setError(null);
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const search = async (term, custom) => {
    setLoading(true);
    try {
      const result = await fetchDatas(
        `${custom || apiUrl}?search=${encodeURIComponent(term)}`
      );
      setError(null);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loadOne = async (id, custom) => {
    setLoading(true);
    try {
      const result = await fetchDataById(custom || apiUrl, id);
      setItem(result);
      setError(null);
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const create = async (obj, custom) => {
    setLoading(true);
    try {
      const result = await createData(custom || apiUrl, obj);
      setData((prev) => [...prev, result]);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, obj, custom) => {
    setLoading(true);
    try {
      const result = await updateData(custom || apiUrl, id, obj);
      setData((prev) => prev.map((item) => (item.id === id ? result : item)));
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id, custom) => {
    setLoading(true);
    try {
      await deleteData(custom || apiUrl, id);
      setData((prev) => prev.filter((item) => item.id !== id));
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
    search,
  };
}
