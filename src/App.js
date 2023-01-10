import './App.css';

function App() {

  let post = "맛집"
  // 기존 JS에선
  // document.querySelector("h4").textContent="맛집"과 같이 사용했지만
  // 리액트에선 위와같이 변수로 보관하여 {}를 사용해 가져온다
  // 이를 데이터바인딩이라 한다

  return (
    <div className="App">
      <div className="black-nav">
        <h3>블로그</h3>
      </div>
      <h4 id={post} style={{color:"red",fontSize:"30px"}}>{post}</h4>
      {/* 위와같이 속성에도 {}로써 변수를 가져올 수 있다. */}
      {/* style을 넣을때는 style=color:"red"형식이 아닌,
        style={{스타일명:"값"}}로 사용한다
      */}
    </div>
  );
}

export default App;
