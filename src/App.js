import './App.css';
import {useState} from 'react';

function App() {

  let post = "아래는 map함수로 새로 만든 내용"
  // 기존 JS에선
  // document.querySelector("h4").textContent="맛집"과 같이 사용했지만
  // 리액트에선 위와같이 변수로 보관하여 {}를 사용해 가져온다
  // 이를 데이터바인딩이라 한다

  let [a,setA] = useState(['남자코트추천','강남맛집','자바스크립트'])
  // a는 state에 보관한 자료 (남자코트자료)
  // setA는 state변경을 도와주는 함수
  
  // state를 써야하는 이유 =
  // 유저가 수정을 할 경우, html이 자동으로 재랜더링이 되므로.


  let [logo,setLogo] = useState("리액트블로그");
  // 위와 같이 블로그이름을 바꾸는 state를 만들수도 있으나,
  // 블로그 이름과 같이 변동이 자주 일어나지않는 것은
  // state를 사용할 필요가 없다.

  let [like,setLike] = useState([0,0,0,0])

  let [modal,setModal] = useState(false); //false true, 0 1 등 형식은 자유

  return (
    // return소괄호 안에서는 하나의 태그로 모두를 감싸줘야한다
    <div className="App">

      <div className="black-nav">
        <h3>{logo}</h3>
      </div>

      <button onClick={()=>{
        let newArr = [...a];
        newArr.sort();
        setA(newArr)
      }}>가나다순</button>

      <div className="list">
        <h4>
          {a[0]}
          <span onClick={
            ()=>{
              let newLike = [...like];
              newLike[0] += 1
              setLike(newLike)
            }
            // state를 변경하고싶다면 무조건 state변경함수를 써야한다.
            // 함수에는 등호를 쓰지않도록 주의
          }>👍</span>
          {like[0]}
        </h4>
        <p>2월 17일</p>
        <button onClick={()=>{
          let copy = [...a];
          // 위와같이 처리해야하는 이유는 state의 작용원리를 보아야하는데,
          // state변경함수는 기존state와 신규state를 비교하여 같은경우,
          // 변경을 해주지않는다.

          // 또한 array데이터를 저장하는 변수는 해당 배열 가리키는
          // 수단으로밖에 사용되지않으므로
          // copy = a 와 같이 사용해도 변화가 생기지않게 된다.

          // 위(copy = a)와같이 작성한뒤,
          // console.log(copy==a)를 작성할시 true가 출력.
          // (같으므로 변경이 되지않음)

          // 자세한 사항은 reference data type 참조

          // 간단히 정리하자면, state가 array나 object와 같은
          // reference data type이라면,
          // 독립적 카피본(shallow copy)을 만들어 수정해야 한다는 뜻.

          // 위(let copy = [...a])처럼 작성할 경우,
          // 완전히 새로운 배열을 만들어 내므로, 정상적으로 작동한다.

          copy[0]="한겨울 여자코트추천"
          // 위와 같이 데이터를 수정한 뒤, 아래와 같이 적용
          setA(copy);
        }}>이름변경</button>
      </div>

      <div className="list">
        <h4>{a[1]}</h4>
        <p>2월 17일</p>
      </div>
      <div className="list">
        <h4 onClick={()=>{
          modal?setModal(false):setModal(true);
        }}>{a[2]}</h4>
        <p>2월 17일</p>
      </div>

      <h4 id={post} style={{color:"red",fontSize:"30px"}}>{post}</h4>
      {/* 위와같이 속성에도 {}로써 변수를 가져올 수 있다. */}
      {/* style을 넣을때는 style=color:"red"형식이 아닌,
        style={{스타일명:"값"}}로 사용한다
      */}

      {/* 
        컴포넌트 만들기 3단계
        1.function을 만든다.(return밖에다)
        2.return안에 html을 담는다.
        3.<함수명/>을 쓴다.
      */}
      {/* 
        컴포넌트로 만들어야 하는것
        1.반복적인 html을 축약할 때.
        2.큰 페이지들.
        3.자주 변경되는것들.
      */}

      {
        // {}안에선 for반복문을 사용할 수 없으므로 map함수를 써준다.
        a.map(function(내용,i){
          return (
            <div className="list" key={i}>
              <h4 onClick={()=>{
                modal?setModal(false):setModal(true);
              }}>{내용}</h4><span onClick={()=>{
                let newLike = [...like];
                newLike[i+1] += 1
                setLike(newLike)
              }
              }>👍</span>
              {like[i+1]}
              
              <p>2월 17일</p>
            </div>
          )
        })
      }

      {
        // 동적 UI작성
        // html의 공간이므로 if를 사용할수 없으므로 삼항연산자를 사용한다.
        modal?<Modal/>:null
      }
      {/* 
        동적 UI 만들기
        1.html css로 디자인 완성
        2.UI의 현재상태를 state로 저장
        3.state에 따라 UI가 어떻게 보일지 작성
      */}


    </div>
  );
}

function Modal(){
  // 컴포넌트의 첫글자는 대문자로
  return (
    <div className='modal'>
      <h4>제목</h4>
      {/* {a}와 같은 변수는 다른 함수에 있으므로 이곳에서 사용할수 없다. */}
      <p>날짜</p>
      <p>내용</p>
    </div>
  )
}
// const Modal = () => {} 과 같이 사용해도 무관하다.

export default App;
