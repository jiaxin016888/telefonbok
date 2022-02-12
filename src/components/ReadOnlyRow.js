import React from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact._id}</td>
      <td>{contact.name}</td>
      <td>{contact.company}</td>
      <td>{contact.phone}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(contact._id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
