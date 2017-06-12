# ws-ngx-login-demo

#### A front-end application written in TypeScript using the  Angular 4.1.x framework.

## Prominent Libraries used:
- [angular-seed](https://github.com/angular/angular-seed)
- [Angular (4.1.x)](https://angular.io/)
- [Angular-Material2](https://material.angular.io/)
- [Angular/FlexLayout](https://github.com/angular/flex-layout)
- [NGRx](https://github.com/ngrx)

## Architecture:
This front-end application is a part of a larger effort using **NodeJS** and **Docker** to demonstrate and highlight some of
the principals and concepts reviewed in the article [Practical Web Development and Architecture](https://medium.com/@will.streeter/practical-web-development-and-architecture-26a37d04c10f).

The application accomplishes user registration and login to access protected content. While this application uses NGRx's libraries to facilitate
a **Redux** architectural pattern, the use of the **PubSubBroker** and **Brokerage**  modules implemented in the  **business-layer**
creates a different approach to the relationship between components and the Redux Store. The **PubSubBroker**  demonstrates
a method for enhancing the  **"separation of concerns"** by de-coupling the **view-layer** from any direct references to
services in the **data-layer** such as those used in a typical NGRx paradigm. Information detailing the rational for implementing
this de-coupling mechanism can be reviewed  in the article [Optimal Angular : PubSub With NGRx](https://medium.com/@will.streeter/optimal-angular-pubsub-with-ngrx-4faab11eb293).


[ws-dev-docker-example](https://github.com/WillStreeter/ws-dev-docker-example) is the repository used to bundle this
application along with three other submodules in a demonstration of using docker-compose to orchestrate development on
a **FullStack**. Those submodules are located in the GitHub repositories listed below.

+ [ws-node-demo](https://github.com/WillStreeter/ws-node-demo)
+ [ws-mongo-demo](https://github.com/WillStreeter/ws-mongo-demo)
+ [ws-nginx-demo](https://github.com/WillStreeter/ws-nginx-demo)
+ **(this repo)** [ws-ngx-login-demo](https://github.com/WillStreeter/ws-ngx-login-demo)

How these containers are used as a bundle to facilitate a **FullStack** approach for developing with Docker is delineated in the article,
[Docker is my {I.D.E}](https://medium.com/@will.streeter/docker-is-my-i-d-e-d6dc84cca26d)


Although the application is best understood as a part of the larger overall effort demonstrated with the [ws-dev-docker-example](https://github.com/WillStreeter/ws-dev-docker-example),
it can still be cloned and stood up without the use of the Docker bundle. To use this application as a separate standalone entity, use the
**[serverless](https://github.com/WillStreeter/ws-ngx-login-demo/tree/serverless)** branch.

### Ways to construct the this application with or without Docker

1. BareMetal (Installing libraries and running it on your machine's OS)

  ```$> git clone https://github.com/WillStreeter/ws-ngx-login-demo.git

     $> git fetch

     $> git checkout origin/serverless

     $> npm install

     $> npm run start

   ```

   + [http://localhost:5555](http://localhost:5555)

2. Using Docker to run standalone application (You must have Docker client installed)

  ```$> git clone https://github.com/WillStreeter/ws-ngx-login-demo.git

     $> git fetch

     $> git checkout origin/serverless

     $> docker-compose up

   ```

   +  [http://localhost:5555](http://localhost:5555)

3. Using the FullStack ( NodeJs, Mongo, NGINX, **This NGX app** )

   + Go to the  [ws-dev-docker-example](https://github.com/WillStreeter/ws-dev-docker-example) repo and follow the README.md



## TODO
 + **configure css for responsive layout**
 + **develop more extensive testing**
 + **demonstrate documentation with [compodoc](https://github.com/compodoc/compodoc)**