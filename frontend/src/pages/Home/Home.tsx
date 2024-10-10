import { Button } from '@mantine/core';

const Home = () => {
  return (
    <div className="home">
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
      <div className="p-4 bg-gray-100">
      <h1 className="text-2xl font-bold text-blue-500">Hello, World!</h1>
        <Button className="mt-4">Mantine Button</Button>
    </div>
    </div>
  );
};

export default Home;
