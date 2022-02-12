import './App.css';
import React, { useState, Fragment } from "react";
import data from "./telefonbok.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";


const App = () => {

  // Using the used hook and now this state is available
  // Update the state with the set contacts function
  const [contacts, setContacts] = useState(data);

  const [addFormData, setAddFormData] = useState({
    _id: "",
    name: "",
    company: "",
    phone: "",
  });


  const [editFormData, setEditFormData] = useState({
    _id: "",
    name: "",
    company: "",
    phone: "",
  });

  //Modify the stored number 
  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    // Cancels the event if it is cancelable
    event.preventDefault();

    // get the value that the user has entered into the input
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    // using the spread operator to copy the existing form data 
    const newFormData = { ...addFormData };

    // update the object with the new value
    newFormData[fieldName] = fieldValue;

    // set this into state 
    setAddFormData(newFormData);
  }

  

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    // Create a new contact
    const newContact = {
      _id: addFormData._id,
      name: addFormData.name,
      company: addFormData.company,
      phone: addFormData.phone,

    };
    //Add contacts to this contacts array
    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };


  // Edit 
  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      _id: editContactId,
      name: editFormData.name,
      company: editFormData.company,
      phone: editFormData.phone,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact._id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };


  // Take the values from the contact object and save it ot edit 
  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact._id);

    const formValues = {
      _id: contact._id,
      name: contact.name,
      company: contact.company,
      phone: contact.phone,

    };

    setEditFormData(formValues);
  };


  // Cancel 
  const handleCancelClick = () => {
    setEditContactId(null);
  };

  // Delete 
  // contactId used to find the indext of that contact and remove them from contact array
  const handleDeleteClick = (contactId) => {

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact._id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };


  const [active, setActive] = useState("Friends");

  return (
    <div className="app-container">
      <nav>
        <button onClick={() => setActive("Friends")}>Friends</button>
        <button onClick={() => setActive("Colleagues")}>Colleagues</button>
      </nav>
      

      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>_id</th>
              <th>Name</th>
              <th>Company</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>


          <tbody>
            {/* use the map function to flip over array of contacts  */}
            {contacts.map((contact) => (
              <Fragment>
                {/* if the id of the current contact object matches the id stored in state */}
                {editContactId === contact._id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}

              </Fragment>

            ))}

          </tbody>
        </table>
      </form>

      <h2>Add a contact</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input type="text" name="_id" required="required" placeholder="Enter an id" onChange={handleAddFormChange} />
        <input type="text" name="name" required="required" placeholder="Enter a name" onChange={handleAddFormChange} />
        <input type="text" name="company" placeholder="Enter a company" onChange={handleAddFormChange} />
        <input type="number" name="phone" required="required" placeholder="Enter a phone number" onChange={handleAddFormChange} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default App;
