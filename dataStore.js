'use strict';

import React from 'react-native';

let {
  AsyncStorage
} = React;

let fetchOptions = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};


export default {

  fetchNews: () => {
    return new Promise((resolve, reject) => {
      fetch('http://con-nexus.bgun.me/api/news?con_id=mysticon2016', fetchOptions)
        .then(resp => resp.json())
        .then(data => {
          resolve(data.items);
        })
        .done();
    });
  },

  fetchFromNetwork: () => {
    return new Promise((resolve, reject) => {
      fetch('http://con-nexus.bgun.me/api/con/mysticon2016', fetchOptions)
        .then(resp => resp.json())
        .then(data => {
          resolve(data);
        })
        .done();
    });
  },

  fetchFromStorage: () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('con_data')
        .then(resp => {
          resolve(JSON.parse(resp));
        })
        .done();
    });
  },

  saveToStorage: (data) => {
    return new Promise((resolve, reject) => {
      let str = JSON.stringify(data);
      AsyncStorage.setItem('con_data', str)
        .then(resp => {
          resolve(true);
        })
        .done();
    });
  },

  fetchTodos: () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('todo')
        .then(resp => {
          let todos = new Set(JSON.parse(resp));
          global.todos = todos;
          resolve(todos);
        })
        .done();
    });
  },

  saveTodos: () => {
    let todo_array = Array.from(global.todos);
    AsyncStorage.setItem('todo', JSON.stringify(todo_array))
      .then(resp => {
        console.log("save todos", resp);
      })
      .done();
  }

}