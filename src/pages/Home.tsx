import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAsyncTask, useAsyncRun } from 'react-hooks-async';
import { ipcRenderer } from 'electron';

import Budget from '../entities/Budget';

const fetchBudgets = async () => {
  const data = await ipcRenderer.invoke('fetch-budgets');
  return data;
};

const BudgetList = () => {
  const task = useAsyncTask<Budget[], unknown[]>(fetchBudgets);
  useAsyncRun(task);
  const { pending, error, result, abort } = task;

  if (pending)
    return (
      <div>
        Loading...{' '}
        <button type="button" onClick={abort}>
          Abort
        </button>
      </div>
    );
  if (error || !result) return <div>Error...</div>;
  return (
    <ul>
      {result.map((item) => {
        return (
          <li key={item.id}>
            <p>{item.name}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default function HomePage() {
  return (
    <div>
      <p>Home</p>
      <Link to="/create">Create Budget</Link>
      {/* <button
        type="button"
        onClick={() => {
          ipcRenderer
            .invoke('fetch-budgets')
            .then((result: any) => {
              console.log(result);
              return result;
            })
            .catch((err: any) => {
              console.log(err);
            });
        }}
      >
        refresh
      </button> */}
      <BudgetList />
    </div>
  );
}
