import { useState } from "react";

// Smart fetch parser: always returns { data, error, status }
const parseJSON = async (res) => {
  let data = null;
  try {
    data = await res.json();
  } catch (_) {}
  if (!res.ok) {
    return {
      data: null,
      error: data?.error || res.statusText,
      status: res.status,
    };
  }
  return { data, error: null, status: res.status };
};

// Basic CRUD fetch functions
const fetchDatas = (url) =>
  fetch(url, { mode: "cors", credentials: "include" }).then(parseJSON);
const fetchDataById = (url, id) =>
  fetch(`${url}/${id}`, { mode: "cors", credentials: "include" }).then(
    parseJSON
  );
const createData = (url, body) =>
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    credentials: "include",
    body: JSON.stringify(body),
  }).then(parseJSON);
const updateData = (url, id, body) =>
  fetch(`${url}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    credentials: "include",
    body: JSON.stringify(body),
  }).then(parseJSON);
const deleteData = (url, id) =>
  fetch(`${url}/${id}`, {
    method: "DELETE",
    mode: "cors",
    credentials: "include",
  }).then(parseJSON);

// useCrud Hook
export default function useCrud(apiUrl) {
  const [data, setData] = useState([]);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAction = async (action) => {
    setLoading(true);
    setError(null);
    try {
      const result = await action();
      if (result.error) setError(result.error);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const load = (custom) =>
    handleAction(async () => {
      const { data, error, status } = await fetchDatas(custom || apiUrl);
      if (!error) setData(data);
      return { data, error, status };
    });

  const search = (term, custom) =>
    handleAction(() =>
      fetchDatas(`${custom || apiUrl}?search=${encodeURIComponent(term)}`)
    );

  const loadOne = (id, custom) =>
    handleAction(async () => {
      const { data, error, status } = await fetchDataById(custom || apiUrl, id);
      if (!error) setItem(data);
      return { data, error, status };
    });

  const create = (obj, custom) =>
    handleAction(async () => {
      const {
        data: newItem,
        error,
        status,
      } = await createData(custom || apiUrl, obj);
      if (!error) setData((prev) => [...prev, newItem]);
      return { data: newItem, error, status };
    });

  const update = (id, obj, custom) =>
    handleAction(async () => {
      const {
        data: updatedItem,
        error,
        status,
      } = await updateData(custom || apiUrl, id, obj);
      if (!error)
        setData((prev) =>
          prev.map((item) => (item.id === id ? updatedItem : item))
        );
      return { data: updatedItem, error, status };
    });

  const remove = (id, custom) =>
    handleAction(async () => {
      const { error, status } = await deleteData(custom || apiUrl, id);
      if (!error) setData((prev) => prev.filter((item) => item.id !== id));
      return { data: null, error, status };
    });

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
