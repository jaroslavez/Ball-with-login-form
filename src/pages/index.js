import styles from "../../styles/Home.module.scss";

import HomeLayout from "../components/HomeLayout";

import { useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setTodos } from "../store/todosSlice";

export default function Home({data}) {
  const ref = useRef();
  const dispatch = useDispatch();
  
  useEffect(() => {
    (async () => {
      const PIXI = await import("pixi.js");
      window.PIXI = PIXI;

      const { gsap } = await import("gsap");
      const { PixiPlugin }  = await import("gsap/PixiPlugin");
      gsap.registerPlugin(PixiPlugin);
      PixiPlugin.registerPIXI(PIXI);
      window.gsap = gsap;

      const {default: Ball} = await import("../ball.js");

      let ball = new Ball(data);
      ball = ball.getInstance();
      if(!ball)
        return;
      
      await ball.init({ background: '#87ceeb', resizeTo: ref.current}, ref.current);
      await ball.loadTextures({height: ref.current.offsetHeight, width: ref.current.offsetWidth});
        //todo: логика инициализации сцены
    })()
  }, []);

  useEffect(() => {
    dispatch(setTodos(data));
  }, [])

  return (
    <div ref={ref} style={{width: "90vw", height: "90vh"}}/> 
  );
}

Home.getLayout = function getLayout(page) {
  return (
    <HomeLayout>
      {page}
    </HomeLayout>
  )
}

export async function getServerSideProps() {
  const res = await axios.get(`https://jsonplaceholder.typicode.com/todos`);
  const data = res.data;
 
  return { props: { data } }
}

