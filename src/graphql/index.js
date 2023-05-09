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
        attendance_type
        can_work_home
        department {
          name
        }
        manager {
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
      }
    }
    positions(first: $first) {
      data {
        name
      }
    }
    attendance_profiles(first: $first) {
      data {
        name
      }
    }
    offices(first: $first) {
      data {
        name
      }
    }
  }
`;

/* 

    TODO GET USER ✔️
    TODO GET Roles from company>>currentSubscription>>plan>>roles
    TODO GET departments 🚀
    TODO GET positions
    TODO GET attendance_profile
    TODO GET office
    TODO GET direct manager from users name
    TODO DELETE USER 
    TODO UPDATE USER
 */
