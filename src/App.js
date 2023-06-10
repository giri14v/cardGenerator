import {useState} from 'react';
import './App.css';

function App() {
    const [userInput, setUserInput] = useState({});

  const handleInputChange = (event) => {
    setUserInput({
      ...userInput,
      [event.target.name]: event.target.value
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUserInput({
        ...userInput,
        image: reader.result
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newUserObject = {
      firstName: userInput.firstName,
      lastName: userInput.lastName,
      age:userInput.age,
      class: userInput.class,
      image: userInput.image
      // Add more properties as needed
    };

    console.log(newUserObject);

    setUserInput(newUserObject);
  };
  return (
    <div className="App">
      <h1>WELCOME TO ID-CARD GENERATOR</h1>
      <form className='form' onSubmit={handleSubmit}>
        <h2>FILL THE DETAILS</h2>
        <input placeholder='Enter your First name'
          type="text"
          name="firstName"
          value={userInput.firstName || ''}
          onChange={handleInputChange}
        />
        <input placeholder='Enter your Last name'
          type="text"
          name="lastName"
          value={userInput.lastName || ''}
          onChange={handleInputChange}
        />
        <input placeholder='Enter your age'
          type="text"
          name="age"
          value={userInput.age || ''}
          onChange={handleInputChange}
        />
        <input placeholder='Enter your class'
          type="text"
          name="class"
          value={userInput.class || ''}
          onChange={handleInputChange}
        />
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
        />
        <button type="submit">Submit</button>
      </form>

      {userInput.image && (
        <div className="card">
          <h2>ID-CARD</h2>
          <img src={userInput.image} alt="User" />
          {Object.keys(userInput).map((key) => {
            if (key !== 'image') {
              return (
                <h4 key={key}>
                  {key}: {userInput[key]}
                </h4>
              );
            }
            return null;
          })}
        </div>
      )}
      
    </div>
  );
}

export default App;
