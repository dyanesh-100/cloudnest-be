const initialData = [
  {
    id: '1',
    name: 'Projects',
    type: 'folder',
    size: null,
    parentId: null,
    createdAt: '2024-01-05T09:00:00',
    lastModifiedAt: '2024-01-06T10:30:00',
    userId: 'user1@gmail.com',
    fileFormat: null  // Folders don't have a file format
  },
  {
    id: '2',
    name: 'ReactApp',
    type: 'folder',
    size: null,
    parentId: '1',
    createdAt: '2024-01-06T11:00:00',
    lastModifiedAt: '2024-01-06T12:45:00',
    userId: 'user1@gmail.com',
    fileFormat: null
  },
  {
    id: '3',
    name: 'index.js',
    type: 'file',
    size: 51200,  // 50KB in bytes
    parentId: '2',
    createdAt: '2024-01-06T11:15:00',
    lastModifiedAt: '2024-01-06T11:50:00',
    userId: 'user1@gmail.com',
    fileFormat: 'js'
  },
  {
    id: '4',
    name: 'package.json',
    type: 'file',
    size: 5120,  // 5KB in bytes
    parentId: '2',
    createdAt: '2024-01-06T11:20:00',
    lastModifiedAt: '2024-01-06T11:55:00',
    userId: 'user1@gmail.com',
    fileFormat: 'json'
  },
  {
    id: '5',
    name: 'Documents',
    type: 'folder',
    size: null,
    parentId: null,
    createdAt: '2024-01-07T08:00:00',
    lastModifiedAt: '2024-01-07T09:15:00',
    userId: 'user2@gmail.com',
    fileFormat: null
  },
  {
    id: '6',
    name: 'Resume.docx',
    type: 'file',
    size: 122880,  // 120KB in bytes
    parentId: '5',
    createdAt: '2024-01-07T08:10:00',
    lastModifiedAt: '2024-01-07T09:00:00',
    userId: 'user2@gmail.com',
    fileFormat: 'docx'
  },
  {
    id: '7',
    name: 'Invoices',
    type: 'folder',
    size: null,
    parentId: '5',
    createdAt: '2024-01-07T10:00:00',
    lastModifiedAt: '2024-01-07T10:45:00',
    userId: 'user2@gmail.com',
    fileFormat: null
  },
  {
    id: '8',
    name: 'Invoice_2024.pdf',
    type: 'file',
    size: 307200,  // 300KB in bytes
    parentId: '7',
    createdAt: '2024-01-07T10:10:00',
    lastModifiedAt: '2024-01-07T10:35:00',
    userId: 'user2@gmail.com',
    fileFormat: 'pdf'
  },
  {
    id: '9',
    name: 'Photos',
    type: 'folder',
    size: null,
    parentId: null,
    createdAt: '2024-01-08T09:00:00',
    lastModifiedAt: '2024-01-08T09:45:00',
    userId: 'user3@gmail.com',
    fileFormat: null
  },
  {
    id: '10',
    name: 'Vacation',
    type: 'folder',
    size: null,
    parentId: '9',
    createdAt: '2024-01-08T09:10:00',
    lastModifiedAt: '2024-01-08T09:55:00',
    userId: 'user3@gmail.com',
    fileFormat: null
  },
  {
    id: '11',
    name: 'beach.jpg',
    type: 'file',
    size: 2097152,  // 2MB in bytes
    parentId: '10',
    createdAt: '2024-01-08T09:15:00',
    lastModifiedAt: '2024-01-08T10:00:00',
    userId: 'user3@gmail.com',
    fileFormat: 'jpg'
  },
  {
    id: '12',
    name: 'mountains.png',
    type: 'file',
    size: 3145728,  // 3MB in bytes
    parentId: '10',
    createdAt: '2024-01-08T09:20:00',
    lastModifiedAt: '2024-01-08T10:05:00',
    userId: 'user3@gmail.com',
    fileFormat: 'png'
  },
  {
    id: '13',
    name: 'Work',
    type: 'folder',
    size: null,
    parentId: null,
    createdAt: '2024-01-09T08:30:00',
    lastModifiedAt: '2024-01-09T09:45:00',
    userId: 'user4@gmail.com',
    fileFormat: null
  },
  {
    id: '14',
    name: 'Designs',
    type: 'folder',
    size: null,
    parentId: '13',
    createdAt: '2024-01-09T08:45:00',
    lastModifiedAt: '2024-01-09T09:50:00',
    userId: 'user4@gmail.com',
    fileFormat: null
  },
  {
    id: '15',
    name: 'UI_mockup.png',
    type: 'file',
    size: 1572864,  // 1.5MB in bytes
    parentId: '14',
    createdAt: '2024-01-09T08:50:00',
    lastModifiedAt: '2024-01-09T09:20:00',
    userId: 'user4@gmail.com',
    fileFormat: 'png'
  },
  {
    id: '16',
    name: 'Presentations',
    type: 'folder',
    size: null,
    parentId: null,
    createdAt: '2024-01-10T07:00:00',
    lastModifiedAt: '2024-01-10T08:00:00',
    userId: 'user1@gmail.com',
    fileFormat: null
  },
  {
    id: '17',
    name: 'Q3_review.pptx',
    type: 'file',
    size: 5242880,  // 5MB in bytes
    parentId: '16',
    createdAt: '2024-01-10T07:05:00',
    lastModifiedAt: '2024-01-10T08:15:00',
    userId: 'user1@gmail.com',
    fileFormat: 'pptx'
  },
  {
    id: '18',
    name: 'Reports',
    type: 'folder',
    size: null,
    parentId: '16',
    createdAt: '2024-01-10T07:10:00',
    lastModifiedAt: '2024-01-10T08:20:00',
    userId: 'user1@gmail.com',
    fileFormat: null
  },
  {
    id: '19',
    name: 'AnnualReport2024.pdf',
    type: 'file',
    size: 1048576,  // 1MB in bytes
    parentId: '18',
    createdAt: '2024-01-10T07:15:00',
    lastModifiedAt: '2024-01-10T08:25:00',
    userId: 'user1@gmail.com',
    fileFormat: 'pdf'
  },
  {
    id: '20',
    name: 'Book.pdf',
    type: 'file',
    size: 2411724,  // 2.3MB in bytes
    parentId: null,
    createdAt: '2024-01-10T07:20:00',
    lastModifiedAt: '2024-01-10T08:30:00',
    userId: 'user2@gmail.com',
    fileFormat: 'pdf'
  },
  {
    id: '21',
    name: 'ProjectsArchive',
    type: 'folder',
    size: null,
    parentId: null,
    createdAt: '2024-02-01T09:00:00',
    lastModifiedAt: '2024-02-01T11:00:00',
    userId: 'user5@gmail.com',
    fileFormat: null
  },
  {
    id: '22',
    name: 'OldProject.zip',
    type: 'file',
    size: 5242880,  // 5MB in bytes
    parentId: '21',
    createdAt: '2024-02-01T09:15:00',
    lastModifiedAt: '2024-02-01T10:30:00',
    userId: 'user5@gmail.com',
    fileFormat: 'zip'
  }
];

module.exports = initialData;