
export const TEST_DATA = {

     'newUser_1_Attempt':{
          'id': '123newUser1',
          'username': 'peterpiper',
          'firstname': 'peter',
          'lastname': 'piper',
          'password': 'password',
          'email': 'pp@basic.com'
        },

     'regUser_1_Service':{
          'username': 'peterpiper',
          'password': 'password',
          'firstname': 'peter',
          'lastname': 'piper',
          'email': 'pp@basic.com'
        },
     'regUser_1_HttpService':{
          'username': 'peterpiper',
          'password': 'password',
          'firstname': 'peter',
          'lastname': 'piper',
          'email': 'pp@basic.com'
        },
     'regUser_1_Service_ResOptions':{
        'account':{
             'user':{
               'username': 'peterpiper',
               'firstname': 'peter',
               'lastname': 'piper',
               'password': 'password',
               'email': 'pp@basic.com'
             },
             'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
        }
     },

     'regUser_1_Service_Result':{
        'type': '[ProfileActions] user registration successful',
        'payload':{
            'user':{
                   'username': 'peterpiper',
                   'firstname': 'peter',
                   'lastname': 'piper',
                   'password': 'password',
                   'email': 'pp@basic.com'
                 },
             'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
        }

     },

     'newUser_1_Result':{
          'id': '123newUser1',
          'username': 'peterpiper',
          'firstname': 'peter',
          'lastname': 'piper',
          'email': 'pp@basic.com',
          'token': '123peterpiperpicked'
        },

     'checkUser_1_Attempt':{
          'username': 'peterpiper'
        },


     'currentUser_1_setup':{
          'user':{
               'id': '123newUser1',
               'username': 'peterpiper',
               'firstname': 'peter',
               'lastname': 'piper',
               'email': 'pp@basic.com',
               'token': '123peterpiperpicked'
          },
     },
     'checkUser_2_Attempt':{
          'username': 'docilepeter'
        },
};



