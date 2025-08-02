const volunteers = [
  {
    id: 1,
    name: 'Alice Smith',
    email: 'alice.smith@example.com',
    status: 'active',
    tasksCompleted: 10,
    eventsAttended: 5,
    isDeleted: false,
  },
  {
    id: 2,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    status: 'inactive',
    tasksCompleted: 3,
    eventsAttended: 2,
    isDeleted: false,
  },
  {
    id: 3,
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    status: 'active',
    tasksCompleted: 15,
    eventsAttended: 8,
    isDeleted: false,
  },
  {
    id: 4,
    name: 'Diana Prince',
    email: 'diana.prince@example.com',
    status: 'active',
    tasksCompleted: 7,
    eventsAttended: 4,
    isDeleted: true,
  },
];

export const fetchVolunteers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(volunteers.filter(v => !v.isDeleted));
    }, 500);
  });
};

export const fetchAllVolunteers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(volunteers);
    }, 500);
  });
};

export const addVolunteer = (newVolunteer) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const id = volunteers.length > 0 ? Math.max(...volunteers.map(v => v.id)) + 1 : 1;
      const volunteerWithId = { ...newVolunteer, id, isDeleted: false };
      volunteers.push(volunteerWithId);
      resolve(volunteerWithId);
    }, 500);
  });
};

export const updateVolunteer = (updatedVolunteer) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = volunteers.findIndex((v) => v.id === updatedVolunteer.id);
      if (index !== -1) {
        volunteers[index] = { ...volunteers[index], ...updatedVolunteer };
        resolve(volunteers[index]);
      } else {
        reject(new Error('Volunteer not found'));
      }
    }, 500);
  });
};

export const softDeleteVolunteer = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = volunteers.findIndex((v) => v.id === id);
      if (index !== -1) {
        volunteers[index].isDeleted = true;
        resolve(volunteers[index]);
      } else {
        reject(new Error('Volunteer not found'));
      }
    }, 500);
  });
};

export const restoreVolunteer = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = volunteers.findIndex((v) => v.id === id);
      if (index !== -1) {
        volunteers[index].isDeleted = false;
        resolve(volunteers[index]);
      } else {
        reject(new Error('Volunteer not found'));
      }
    }, 500);
  });
};

