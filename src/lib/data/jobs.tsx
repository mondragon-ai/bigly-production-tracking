import {JobDocument} from "../types/jobs";

const stages = [
  {
    title: "Pending",
    stage: "pending",
  },

  {
    title: "Printing",
    stage: "printing",
  },
  {
    title: "Cutting",
    stage: "cutting",
  },
  {
    title: "Pressing",
    stage: "pressing",
  },
  {
    title: "Double Pressing",
    stage: "double",
  },
  {
    title: "Folding",
    stage: "folding",
  },
  {
    title: "Complete",
    stage: "complete",
  },
];

export const job_list: JobDocument[] = [
  {
    id: "job_001",
    job_name: "1234",
    is_priority: true,
    is_approved: false,
    stage: "pending",
    staff: [
      {
        id: "staff_001",
        name: "John Doe",
        email: "johndoe@example.com",
        role: "staff",
        position: "pending",
      },
      {
        id: "staff_002",
        name: "Jane Smith",
        email: "janesmith@example.com",
        role: "admin",
        position: "pending",
      },
    ],
    time_started: {
      pending: "2024-10-01T08:00:00Z",
      printing: "",
      cutting: "",
      staging: "",
      pressing: "",
      double: "",
      folding: "",
    },
    time_ended: {
      pending: "",
      printing: "",
      cutting: "",
      staging: "",
      pressing: "",
      double: "",
      folding: "",
    },
    error_rate: {
      pending: 1,
      printing: 0,
      cutting: 0,
      staging: 0,
      pressing: 0,
      double: 0,
      folding: 0,
      completed: 0,
    },
    items: [
      {
        has_error: false,
        staff_error: "",
        staff: "John Doe",
        id: "item_001",
        images: {
          front: "https://example.com/images/item_001_front.png",
          back: "https://example.com/images/item_001_back.png",
          sleve: "https://example.com/images/item_001_sleve.png",
          front_mockup: "https://example.com/images/item_001_front_mockup.png",
          back_mockup: "https://example.com/images/item_001_back_mockup.png",
        },
        sku: "5678-L-BLUE",
        size: "L",
        color: "Blue",
        type: "shirt",
        store: "Example Store",
        status: "pending",
      },
      {
        has_error: true,
        staff_error: "Misaligned print",
        staff: "Jane Smith",
        id: "item_002",
        images: {
          front: "https://example.com/images/item_002_front.png",
          back: "https://example.com/images/item_002_back.png",
          sleve: "https://example.com/images/item_002_sleve.png",
          front_mockup: "https://example.com/images/item_002_front_mockup.png",
          back_mockup: "https://example.com/images/item_002_back_mockup.png",
        },
        sku: "5679-M-RED",
        size: "M",
        color: "Red",
        type: "hoodie",
        store: "Example Store",
        status: "pending",
      },
    ],
    created_at: "2024-10-01T12:00:00Z",
    updated_at: "2024-10-02T08:00:00Z",
  },
  {
    id: "job_002",
    job_name: "1235",
    is_priority: false,
    is_approved: true,
    stage: "printing",
    staff: [
      {
        id: "staff_003",
        name: "Alice Johnson",
        email: "alicejohnson@example.com",
        role: "staff",
        position: "printing",
      },
      {
        id: "staff_002",
        name: "Jane Smith",
        email: "janesmith@example.com",
        role: "admin",
        position: "printing",
      },
    ],
    time_started: {
      pending: "2024-10-02T09:00:00Z",
      printing: "2024-10-02T10:00:00Z",
      cutting: "",
      staging: "",
      pressing: "",
      double: "",
      folding: "",
    },
    time_ended: {
      pending: "2024-10-02T09:55:00Z",
      printing: "",
      cutting: "",
      staging: "",
      pressing: "",
      double: "",
      folding: "",
    },
    error_rate: {
      pending: 0,
      printing: 1,
      cutting: 0,
      staging: 0,
      pressing: 0,
      double: 0,
      folding: 0,
      completed: 0,
    },
    items: [
      {
        has_error: true,
        staff_error: "Printing smudge",
        staff: "Alice Johnson",
        id: "item_003",
        images: {
          front: "https://example.com/images/item_003_front.png",
          back: "https://example.com/images/item_003_back.png",
          sleve: "https://example.com/images/item_003_sleve.png",
          front_mockup: "https://example.com/images/item_003_front_mockup.png",
          back_mockup: "https://example.com/images/item_003_back_mockup.png",
        },
        sku: "6789-XL-GREEN",
        size: "XL",
        color: "Green",
        type: "shirt",
        store: "Another Store",
        status: "pending",
      },
    ],
    created_at: "2024-10-02T08:00:00Z",
    updated_at: "2024-10-02T10:00:00Z",
  },
  {
    id: "job_003",
    job_name: "1236",
    is_priority: true,
    is_approved: true,
    stage: "cutting",
    staff: [
      {
        id: "staff_004",
        name: "Bob Williams",
        email: "bobwilliams@example.com",
        role: "staff",
        position: "cutting",
      },
      {
        id: "staff_001",
        name: "John Doe",
        email: "johndoe@example.com",
        role: "staff",
        position: "cutting",
      },
      {
        id: "staff_003",
        name: "Alice Johnson",
        email: "alicejohnson@example.com",
        role: "staff",
        position: "printing",
      },
      {
        id: "staff_002",
        name: "Jane Smith",
        email: "janesmith@example.com",
        role: "admin",
        position: "printing",
      },
      {
        id: "staff_003",
        name: "Alice Johnson",
        email: "alicejohnson@example.com",
        role: "staff",
        position: "printing",
      },
    ],
    time_started: {
      pending: "2024-10-03T08:00:00Z",
      printing: "2024-10-03T09:00:00Z",
      cutting: "2024-10-03T10:00:00Z",
      staging: "",
      pressing: "",
      double: "",
      folding: "",
    },
    time_ended: {
      pending: "2024-10-03T08:55:00Z",
      printing: "2024-10-03T09:55:00Z",
      cutting: "",
      staging: "",
      pressing: "",
      double: "",
      folding: "",
    },
    error_rate: {
      pending: 0,
      printing: 0,
      cutting: 2,
      staging: 0,
      pressing: 0,
      double: 0,
      folding: 0,
      completed: 0,
    },
    items: [
      {
        has_error: false,
        staff_error: "",
        staff: "Bob Williams",
        id: "item_004",
        images: {
          front: "https://example.com/images/item_004_front.png",
          back: "https://example.com/images/item_004_back.png",
          sleve: "https://example.com/images/item_004_sleve.png",
          front_mockup: "https://example.com/images/item_004_front_mockup.png",
          back_mockup: "https://example.com/images/item_004_back_mockup.png",
        },
        sku: "7890-M-YELLOW",
        size: "M",
        color: "Yellow",
        type: "hoodie",
        store: "Example Store",
        status: "pending",
      },
    ],
    created_at: "2024-10-03T07:00:00Z",
    updated_at: "2024-10-03T10:00:00Z",
  },
  {
    id: "job_004",
    job_name: "1237",
    is_priority: false,
    is_approved: true,
    stage: "pressing",
    staff: [
      {
        id: "staff_005",
        name: "Tom Harris",
        email: "tomharris@example.com",
        role: "staff",
        position: "pressing",
      },
      {
        id: "staff_002",
        name: "Jane Smith",
        email: "janesmith@example.com",
        role: "admin",
        position: "pressing",
      },
    ],
    time_started: {
      pending: "2024-10-04T08:00:00Z",
      printing: "2024-10-04T09:00:00Z",
      cutting: "2024-10-04T10:00:00Z",
      staging: "2024-10-04T11:00:00Z",
      pressing: "2024-10-04T12:00:00Z",
      double: "",
      folding: "",
    },
    time_ended: {
      pending: "2024-10-04T08:55:00Z",
      printing: "2024-10-04T09:55:00Z",
      cutting: "2024-10-04T10:55:00Z",
      staging: "2024-10-04T11:55:00Z",
      pressing: "",
      double: "",
      folding: "",
    },
    error_rate: {
      pending: 0,
      printing: 1,
      cutting: 0,
      staging: 0,
      pressing: 2,
      double: 0,
      folding: 0,
      completed: 0,
    },
    items: [
      {
        has_error: true,
        staff_error: "Improper pressing temperature",
        staff: "Tom Harris",
        id: "item_005",
        images: {
          front: "https://example.com/images/item_005_front.png",
          back: "https://example.com/images/item_005_back.png",
          sleve: "https://example.com/images/item_005_sleve.png",
          front_mockup: "https://example.com/images/item_005_front_mockup.png",
          back_mockup: "https://example.com/images/item_005_back_mockup.png",
        },
        sku: "8901-S-BLACK",
        size: "S",
        color: "Black",
        type: "shirt",
        store: "Third Store",
        status: "pending",
      },
    ],
    created_at: "2024-10-04T07:00:00Z",
    updated_at: "2024-10-04T12:00:00Z",
  },
  {
    id: "job_005",
    job_name: "1238",
    is_priority: true,
    is_approved: true,
    stage: "double",
    staff: [
      {
        id: "staff_006",
        name: "Lucy Brown",
        email: "lucybrown@example.com",
        role: "staff",
        position: "double",
      },
      {
        id: "staff_003",
        name: "Alice Johnson",
        email: "alicejohnson@example.com",
        role: "staff",
        position: "double",
      },
    ],
    time_started: {
      pending: "2024-10-05T08:00:00Z",
      printing: "2024-10-05T09:00:00Z",
      cutting: "2024-10-05T10:00:00Z",
      staging: "2024-10-05T11:00:00Z",
      pressing: "2024-10-05T12:00:00Z",
      double: "2024-10-05T13:00:00Z",
      folding: "",
    },
    time_ended: {
      pending: "2024-10-05T08:55:00Z",
      printing: "2024-10-05T09:55:00Z",
      cutting: "2024-10-05T10:55:00Z",
      staging: "2024-10-05T11:55:00Z",
      pressing: "2024-10-05T12:55:00Z",
      double: "",
      folding: "",
    },
    error_rate: {
      pending: 0,
      printing: 0,
      cutting: 0,
      staging: 0,
      pressing: 1,
      double: 1,
      folding: 0,
      completed: 0,
    },
    items: [
      {
        has_error: false,
        staff_error: "",
        staff: "Lucy Brown",
        id: "item_006",
        images: {
          front: "https://example.com/images/item_006_front.png",
          back: "https://example.com/images/item_006_back.png",
          sleve: "https://example.com/images/item_006_sleve.png",
          front_mockup: "https://example.com/images/item_006_front_mockup.png",
          back_mockup: "https://example.com/images/item_006_back_mockup.png",
        },
        sku: "3456-L-WHITE",
        size: "L",
        color: "White",
        type: "hoodie",
        store: "Fourth Store",
        status: "pending",
      },
    ],
    created_at: "2024-10-05T07:00:00Z",
    updated_at: "2024-10-05T13:00:00Z",
  },
  {
    id: "job_006",
    job_name: "1239",
    is_priority: false,
    is_approved: true,
    stage: "folding",
    staff: [
      {
        id: "staff_007",
        name: "Mark Spencer",
        email: "markspencer@example.com",
        role: "staff",
        position: "folding",
      },
      {
        id: "staff_002",
        name: "Jane Smith",
        email: "janesmith@example.com",
        role: "admin",
        position: "folding",
      },
    ],
    time_started: {
      pending: "2024-10-06T08:00:00Z",
      printing: "2024-10-06T09:00:00Z",
      cutting: "2024-10-06T10:00:00Z",
      staging: "2024-10-06T11:00:00Z",
      pressing: "2024-10-06T12:00:00Z",
      double: "2024-10-06T13:00:00Z",
      folding: "2024-10-06T14:00:00Z",
    },
    time_ended: {
      pending: "2024-10-06T08:55:00Z",
      printing: "2024-10-06T09:55:00Z",
      cutting: "2024-10-06T10:55:00Z",
      staging: "2024-10-06T11:55:00Z",
      pressing: "2024-10-06T12:55:00Z",
      double: "2024-10-06T13:55:00Z",
      folding: "",
    },
    error_rate: {
      pending: 0,
      printing: 0,
      cutting: 1,
      staging: 0,
      pressing: 0,
      double: 0,
      folding: 1,
      completed: 0,
    },
    items: [
      {
        has_error: true,
        staff_error: "Folding error",
        staff: "Mark Spencer",
        id: "item_007",
        images: {
          front: "https://example.com/images/item_007_front.png",
          back: "https://example.com/images/item_007_back.png",
          sleve: "https://example.com/images/item_007_sleve.png",
          front_mockup: "https://example.com/images/item_007_front_mockup.png",
          back_mockup: "https://example.com/images/item_007_back_mockup.png",
        },
        sku: "9123-XL-GRAY",
        size: "XL",
        color: "Gray",
        type: "hoodie",
        store: "Fifth Store",
        status: "pending",
      },
    ],
    created_at: "2024-10-06T07:00:00Z",
    updated_at: "2024-10-06T14:00:00Z",
  },
  {
    id: "job_007",
    job_name: "1240",
    is_priority: true,
    is_approved: true,
    stage: "completed",
    staff: [
      {
        id: "staff_008",
        name: "Emily Clark",
        email: "emilyclark@example.com",
        role: "staff",
        position: "folding",
      },
      {
        id: "staff_009",
        name: "Robert White",
        email: "robertwhite@example.com",
        role: "admin",
        position: "pressing",
      },
    ],
    time_started: {
      pending: "2024-10-07T08:00:00Z",
      printing: "2024-10-07T09:00:00Z",
      cutting: "2024-10-07T10:00:00Z",
      staging: "2024-10-07T11:00:00Z",
      pressing: "2024-10-07T12:00:00Z",
      double: "2024-10-07T13:00:00Z",
      folding: "2024-10-07T14:00:00Z",
    },
    time_ended: {
      pending: "2024-10-07T08:55:00Z",
      printing: "2024-10-07T09:55:00Z",
      cutting: "2024-10-07T10:55:00Z",
      staging: "2024-10-07T11:55:00Z",
      pressing: "2024-10-07T12:55:00Z",
      double: "2024-10-07T13:55:00Z",
      folding: "2024-10-07T14:55:00Z",
    },
    error_rate: {
      pending: 0,
      printing: 1,
      cutting: 0,
      staging: 0,
      pressing: 0,
      double: 0,
      folding: 0,
      completed: 0,
    },
    items: [
      {
        has_error: false,
        staff_error: "",
        staff: "Emily Clark",
        id: "item_008",
        images: {
          front: "https://example.com/images/item_008_front.png",
          back: "https://example.com/images/item_008_back.png",
          sleve: "https://example.com/images/item_008_sleve.png",
          front_mockup: "https://example.com/images/item_008_front_mockup.png",
          back_mockup: "https://example.com/images/item_008_back_mockup.png",
        },
        sku: "4567-M-BLUE",
        size: "M",
        color: "Blue",
        type: "shirt",
        store: "Sixth Store",
        status: "completed",
      },
    ],
    created_at: "2024-10-07T07:00:00Z",
    updated_at: "2024-10-07T15:00:00Z",
  },
];
