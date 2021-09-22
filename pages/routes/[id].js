import Head from 'next/head';
import Link from 'next/link';
import { getAllIds, getData } from '../../lib/data';
import Layout from '../../components/layout';


//create an instance of getStaticProps() to return data for one person

export async function getStaticProps({ params }){
  const itemData = await getData(params.id);
  return{
    props:{
      itemData
    }
  };
}

//create an instance of the getStaticPaths() to report to next all possible dynamic urls
export async function getStaticPaths(
){
  const paths = getAllIds();
  return {
    paths, fallback: false
  };
}

//make a react component to displayt all details about a person when a dynamic route matches
export default function Entry({ itemData }){
  return(
    <Layout>
      <article class="card col-6">
        <div class="card-body">
          <h5 class="card-title">{itemData.first_name} {itemData.last_name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{itemData.email}</h6>
          <p class="card-text">{itemData.home_city}, {itemData.home_country}</p>
          <p class="card-text">Favorite color: {itemData.fav_color}
          </p>
        </div>
      </article>
      <br />
      <div className="list-group col-6">
          <h6 class="text-muted">Users related by favorite color:</h6>
          {itemData.color_companions.map(({ id, name }) => (
            <Link key={id} href={`/routes/${id}`}>
              <a className="list-group-item list-group-item-action">{name}</a>
            </Link>
          ))}
        </div>
    </Layout>
  );
}