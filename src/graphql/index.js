import { gql } from "@apollo/client";

export const GET_COMPANY_USERS = gql`
  query company_users($first: Int!, $page: Int!, $input: String!) {
    company_users(first: $first, page: $page, input: { name: $input }) {
      data {
        id
        name
        img_path
        starts_at
        phone
        email
        attendance_profile {
          name
          id
        }
        can_work_home
        department {
          name
          id
        }
        manager {
          name
          id
        }
        copied_managers {
          name
          id
        }
        office {
          name
          id
        }
        position {
          name
          id
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

export const GET_USER_BY_ID = gql`
  query get_user($id: ID!) {
    user(id: $id) {
      id
      name
      img_path
      starts_at
      phone
      email
      attendance_profile {
        name
        id
      }
      can_work_home
      department {
        name
        id
      }
      manager {
        name
        id
      }
      copied_managers {
        name
        id
      }
      office {
        name
        id
      }
      position {
        name
        id
      }
    }
  }
`;

// export const GET_DEPARTMENTS = gql`
//   query get_department {
//     company_departments(first: 100) {
//       data {
//         name
//       }
//     }
//   }
// `;

// export const GET_POSITIONS = gql`
//    query positions(first: 100) {
//     data {
//       name
//     }
//   }
// `;

// export const GET_ATTENDANCE = gql`
//   query get_attendance_profile {
//     attendance_profiles(first: 100) {
//       data {
//         name
//       }
//     }
//   }
// `;

// export const GET_OFFICES = gql`
//   query offices {
//     offices(first: 100) {
//       data {
//         name
//       }
//     }
//   }
// `;

// export const GET_ROLES = gql`
//   query get_roles {
//     company {
//       currentSubscription {
//         plan {
//           roles {
//             name
//           }
//         }
//       }
//     }
//   }
// `;

export const GET_ALL_OPTIONS = gql`
  query get_All_options($first: Int!) {
    company_users {
      data {
        id
        name
      }
    }
    company_departments(first: $first) {
      data {
        name
        id
      }
    }
    positions(first: $first) {
      data {
        name
        id
      }
    }
    attendance_profiles(first: $first) {
      data {
        name
        id
      }
    }
    offices(first: $first) {
      data {
        name
        id
      }
    }
    profile {
      company {
        currentSubscription {
          plan {
            roles {
              name
              id
            }
          }
        }
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!, $password: String!) {
    delete_user(id: $id, password: $password) {
      status
      message
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($ext: UserInput!) {
  update_user(input: { user_input: $ext }) {
    id
      name
      img_path
      starts_at
      phone
      email
      attendance_profile {
        name
        id
      }
      can_work_home
      department {
        name
        id
      }
      manager {
        name
        id
      }
      copied_managers {
        name
        id
      }
      office {
        name
        id
      }
      position {
        name
        id
      }
  }
}
`;

/* 

    TODO GET USER ✔️
    TODO GET Roles from company>>currentSubscription>>plan>>roles ✔️
    TODO GET departments ✔️
    TODO GET positions ✔️
    TODO GET attendance_profile ✔️
    TODO GET office ✔️
    TODO GET direct manager from users name ✔️
    TODO DELETE USER ✔️
    TODO UPDATE USER 🚀
    TODO Add USER 
 */
