# Interview Scheduler

Interview Scheduler is an app that allows you to well...schedule interviews with interviewers. Plain and simple!


> Add


<a href="https://interview-scheduler-jc.netlify.app/"><img src="https://github.com/jeffreycao1998/Interview-Scheduler/blob/master/docs/Add.gif?raw=true"></a>


> Edit


<a href="https://interview-scheduler-jc.netlify.app/"><img src="https://github.com/jeffreycao1998/Interview-Scheduler/blob/master/docs/Edit.gif?raw=true"></a>
  

> Delete


<a href="https://interview-scheduler-jc.netlify.app/"><img src="https://github.com/jeffreycao1998/Interview-Scheduler/blob/master/docs/Delete.gif?raw=true"></a>

The server is hosted on heroku while the client is hosted on netlify. Click on a gif above to test it out!
  
## Features

Utilises websockets for real time updates on slot availability. If someone books and interview in one slot, everyone connected will see that slot become taken. React allowed allowed for easy transitioning between different 'appointment slot' states (between saving, editing, showing an interview, showing an empty interview, and the loading screens). On the backend (seperate respository) responses are purposely delayed by one second in order to show the different loading states.

## Testing

Testing is an important part of any app. Interview scheduler uses two different testing librariers, Jest and Cypress. Jest was used mainly to perform integration tests while Cypress was used for end to end testing.

## Tech Used

- Node
- Axios
- Websockets
- React
- Storybook
- Cypress
- Jest
