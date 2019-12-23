import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Index from '@/views/Index'
import Register from "../views/Register";
import Note from '../views/Note';
import Star from '../views/Star';
import Content from '../views/Content';
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error=> error)
};
Vue.use(Router);

export default new Router({
  routes: [
      {
        path:'/index/',
          component:Index,
          children:[
              {
                  path:':type',
                  component:Note,
                  children:[
                      {
                          path:':id',
                          component:Content
                      }
                  ]
              }
          ]
      },
      {
            path:'/:type/',
            name:'Folder',
            component:Index,
            children:[
                {
                    path:':folder_id',
                    component: Note,
                    children:[
                        {
                            path:':id',
                            component:Content
                        }
                    ]

                }
            ]
      },

      {
        path:'/',
          component:Index,
      },
    {
      path:'/login',
      name:'Login',
      component: Login
    },
    {
      path:'/register',
      name:'register',
      component:Register,
    }
  ]
})
