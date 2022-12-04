import dynamic from "next/dynamic";

const Editor = dynamic(() => import("components/Editor"), {
  ssr: false,
});

const Home: React.FC = () => {
  return <Editor />;
};

export default Home;
