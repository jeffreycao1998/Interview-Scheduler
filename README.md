# Interview Scheduler

Interview Scheduler is an app that allows you to well...schedule interviews with interviewers. Plain and simple!

<a href="https://fervent-franklin-5beb6f.netlify.app/"><img src=" " title="FVCproductions" alt="FVCproductions"></a>

The server is hosted on heroku while the client is hosted on netlify where you can take the app for a test drive.

## How it works

<figure class="video_container">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/xnTNLPR-mtU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</figure>
  
## Features

Utilises websockets for real time updates on slot availability. If someone books and interview in one slot, everyone connected will see that slot become taken. React allowed allowed for easy transitioning between different 'appointment slot' states (between saving, editing, showing an interview, showing an empty interview, and the loading screens). On the backend (seperate respository) responses are delayed by 1 sec purposely to show the loading states.

## Testing

Testing is an important part of any app. Interview scheduler uses two different testing librariers, Jest and Cypress. Jest was used mainly to perform integration tests while Cypress was used for end to end tests.

## Tech Used

- Node
- Axios
- Websockets
- React
- Storybook
- Cypress
- Jest
