import logo from './logo.svg';
import './App.css';
import axios from "axios";
import React from "react";

const baseURL = 'http://localhost:4000'

function App() {

  const [questions, setQuestions] = React.useState(null);
  const [filter, setFilter] = React.useState("Medium");

  React.useEffect(() => {
    axios.post(`${baseURL}/get-question`, {
      difficulty: filter,
      topic: "Dynamic"
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      setQuestions(response.data);
    });
  }, [filter]);


  function filterQuestions(level) {
    setFilter(level);
  }

  function getRandomQuestion(filter) {
    axios.post(`${baseURL}/get-random-question`, {
      difficulty: filter,
      topic: "Dynamic"
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      setQuestions(response.data);
    });
  }


  if (!questions) return "No post!"

  const Questions = questions.data;

  
  function checkedQuestion(event){
    console.log(event.target.checked, event.target.id);
    axios.post(`${baseURL}/set-status`, {
      id: event.target.id,
      status: event.target.checked
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  return (
    <div>

      <div className="level-buttons">
      <button onClick={() =>filterQuestions("Hard")}>Hard</button>
      <button onClick={() =>filterQuestions("Medium")}>Medium</button>
      <button onClick={() =>filterQuestions("Easy")}>Easy</button>
      <button onClick={() =>getRandomQuestion("Easy")}>Easy-Random</button>
      <button onClick={() =>getRandomQuestion("Medium")}>Medium-Random</button>
      <button onClick={() =>getRandomQuestion("Hard")}>Hard-Random</button>
      </div>


      <table className="app-table">
        <tr>
          <th>Serial No.</th>
          <th>Question</th>
          <th>Level</th>
          <th>Topics</th>
          <th>Likes/Dislikes</th>
          <th>Status</th>
        </tr>

        {
          questions && questions.data.length ?
            Questions.map((data, i) => {
              return (

                <tr key={data.questionFrontendId}>
                  <td>{data.questionFrontendId}</td>
                  <td><a href={data.url}>{data.title}</a></td>
                  <td>{data.Difficulty}</td>
                  <td>{data.Topics}</td>
                  <td>{data.Likes + '/' + data.Dislikes}</td>
                  <td><input type="checkbox" id={data.questionFrontendId}  onChange={(event) =>checkedQuestion(event)}  defaultChecked={data.Done}></input></td>
                </tr>

              )
            }) : null

        }
      </table>
    </div>
  );
}

export default App;
