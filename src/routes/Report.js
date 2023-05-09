import { useParams } from 'react-router-dom';

export default function Report() {

  const { category } = useParams();

  return(
    <div>
      <h1>reports screen: {category}</h1>
    </div>
  );
}