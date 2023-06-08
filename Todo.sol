// SPDX-License-Identifier: MIT

// specify the solidity version here
pragma solidity ^0.8.9;

contract Todos {
    TodoStruct[] public todos;

    struct TodoStruct {
        string judul;
        string todo;
    }

    function setTodo(string memory _judul, string memory _todo) public {
        todos.push(TodoStruct(_judul, _todo));
    }

    // In this function we are just returning the array
    function getTodo() public view returns (TodoStruct[] memory) {
        return todos;
    }

    // Here we are returning the length of the todos array
    function getTodosLength() public view returns (uint256) {
        uint256 todosLength = todos.length;
        return todosLength;
    }

    // We are using the pop method to remove a todo from the array as you can see we are basically just removing one index
    function deleteToDo(uint256 _index) public {
        require(_index < todos.length, "This todo index does not exist.");
        todos[_index] = todos[getTodosLength() - 1];
        todos.pop();
    }
}
