import { gql } from "@apollo/client";

export const GET_COMPANY_USERS = gql`
    query company_users($first: Int!, $page: Int!,$input: String!){
        company_users(first: $first, page: $page, input: {name: $input}){
            data {
            id
            name
            img_path
            starts_at
            phone
            email
            attendance_type
            can_work_home
            department {
                name
            }
            manager{
                name
            }
            copied_managers {
                name
            }
            office {
                name
            }
            position {
                name
            }
            # role
            }

            paginatorInfo {
            currentPage
            hasMorePages
            total
        }
    }
}
`;