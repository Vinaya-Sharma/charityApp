import { gql } from "@apollo/client";

const GETGRAPHQUERY = gql`
  {
    activeCharities(orderBy: createdAt) {
      id
      idNum
      name
      description
      creator
      funders
      fundedAmount
      completed
      goal
      createdAt
      mainImage
    }
  }
`;

export default GETGRAPHQUERY;
