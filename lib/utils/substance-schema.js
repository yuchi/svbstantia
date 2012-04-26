module.exports = {
  "/type/config": {
    "_id": "/type/config",
    "type": "/type/type",
    "name": "Configuration",
    "properties": {
      "allow_user_registration": {
        "name": "Allow User registration",
        "type": "boolean",
        "unique": true,
        "default": true
      },
      "document_types": {
        "name": "Supported Document Types",
        "type": "string",
        "unique": false,
        "required": false
      }
    }
  },

  "/config/substance": {
    "type": "/type/config",
    "document_types": ["/type/qaa", "/type/manual", "/type/article"],
    "allow_user_registration": true
  },

  "/type/user": {
    "_id": "/type/user",
    "type": "/type/type",
    "name": "User",
    "properties": {
      "username": {
        "name": "Username",
        "unique": true,
        "type": "string",
        "required": true,
        "validator": "^[a-zA-Z_]{1}[a-zA-Z_0-9-]{2,20}$"
      },
      "email": {
        "name": "Email",
        "unique": true,
        "type": "string",
        "required": true,
        "validator": "^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$"
      },
      "name": {
        "name": "Full Name",
        "unique": true,
        "type": "string",
        "required": true
      },
      "website": {
        "name": "Website",
        "unique": true,
        "type": "string"
      },
      "company": {
        "name": "Company",
        "unique": true,
        "type": "string"
      },
      "location": {
        "name": "Location",
        "unique": true,
        "type": "string"
      },
      "password": {
        "name": "Password",
        "unique": true,
        "type": "string",
        "required": true,
        "validator": "^\\w{4,}$"
      },
      "created_at": {
        "name": "Created at",
        "unique": true,
        "type": "date"
      }
    }
  },

  "/type/attribute": {
    "_id": "/type/attribute",
    "type": "/type/type",
    "name": "Attribute",
    "properties": {
      "name": {
        "name": "Attribute Value",
        "unique": true,
        "type": "string",
        "required": true
      },
      "member_of": {
        "name": "Member of Property",
        "unique": true,
        "type": "string",
        "required": true
      }
    }
  },

  "/type/event": {
    "_id": "/type/event",
    "type": "/type/type",
    "properties": {
      "event_type": {
        "name": "Event Type",
        "unique": true,
        "type": "string",
        "required": true
      },
      "message": {
        "name": "Event message",
        "unique": true,
        "type": "string",
        "required": true
      },
      "creator": {
        "name": "User causing the event",
        "unique": true,
        "type": "/type/user",
        "required": true
      },
      "object": {
        "name": "Concerned Object",
        "unique": true,
        "type": "string",
        "required": true
      },
      "link": {
        "name": "Link",
        "unique": true,
        "type": "string",
        "required": true
      },
      "created_at": {
        "name": "Created at",
        "unique": true,
        "type": "date",
        "required": true
      }
    },
    "indexes": {
      "by_date": ["created_at"],
      "by_event_type_and_date": ["event_type", "created_at"]
    }
  },

  "/type/notification": {
    "_id": "/type/notification",
    "type": "/type/type",
    "properties": {
      "event": {
        "name": "Associated Event",
        "unique": true,
        "type": "/type/event",
        "required": true
      },
      "recipient": {
        "name": "Recipient",
        "unique": true,
        "type": "/type/user",
        "required": true
      },
      "read": {
        "name": "Read",
        "type": "boolean",
        "unique": true,
        "default": false
      },
      "created_at": {
        "name": "Created at",
        "unique": true,
        "type": "date",
        "required": true
      },
      "event_type": {
        "name": "Event Type",
        "unique": true,
        "type": "string"
      },
      "message": {
        "name": "Event message",
        "unique": true,
        "type": "string"
      },
      "link": {
        "name": "Link",
        "unique": true,
        "type": "string"
      }
    },
    "indexes": {
      "by_recipient": ["recipient"],
      "by_date": ["created_at"],
      "by_recipient_and_date": ["recipient", "created_at"] 
    }
  },

  "/type/bookmark": {
    "_id": "/type/bookmark",
    "type": "/type/type",
    "properties": {
      "creator": {
        "name": "Creator",
        "unique": true,
        "type": "/type/user",
        "required": true,
        "meta": {}
      },
      "document": {
        "name": "Document",
        "type": "/type/document",
        "unique": true,
        "required": true
      },
      "node": {
        "name": "Referenced Node",
        "type": ["/type/text", "/type/section", "/type/quote", "/type/image", "/type/resource"],
        "unique": true,
        "required": true
      },
      "created_at": {
        "name": "Created at",
        "unique": true,
        "type": "date",
        "required": true
      }
    },
    "indexes": {
      "by_creator": ["creator"]
    }
  },

  "/type/subscription": {
    "_id": "/type/subscription",
    "type": "/type/type",
    "properties": {
      "document": {
        "name": "Document",
        "type": "/type/document",
        "unique": true,
        "required": true
      },
      "user": {
        "name": "User",
        "type": "/type/user",
        "unique": true,
        "required": true
      }
    },
    "indexes": {
      "key": ["user", "document"],
      "by_user": ["user"]
    }
	},

	"/type/comment": {
    "_id": "/type/comment",
    "type": "/type/type",
    "properties": {
      "node": {
        "name": "Node",
        "type": ["/type/section", "/type/text", "/type/image", "/type/resource", "/type/quote", "/type/code", "/type/question", "/type/answer"],
        "unique": true,
        "required": true
      },
      "document": {
        "name": "Document",
        "type": ["/type/document"],
        "unique": true,
        "required": true
      },
      "creator": {
        "name": "Creator",
        "type": "/type/user",
        "unique": true,
        "required": true
      },
      "created_at": {
        "name": "Created at",
        "unique": true,
        "type": "date",
        "required": true
      },
      "content": {
        "name": "Content",
        "type": "string",
        "unique": true,
        "required": true
      }
    },
    "indexes": {
      "by_node": ["node"],
      "by_user": ["user"]
    }
	},

  "/type/document": {
    "_id": "/type/document",
    "type": "/type/type",
    "name": "Document",
    "properties": {
      "name": {
        "name": "Internal name",
        "unique": true,
        "type": "string",
        "required": true,
        "validator": "^[a-zA-Z_0-9]{1}[a-zA-Z_0-9-]{2,40}$"
      },
      "title": {
        "name": "Document Title",
        "unique": true,
        "type": "string",
        "default": ""
      },
      "lead": {
        "name": "Lead",
        "unique": true,
        "type": "string",
        "default": ""
      },
      "creator": {
        "name": "Creator",
        "unique": true,
        "type": "/type/user",
        "required": true,
        "meta": {}
      },
      "created_at": {
        "name": "Created at",
        "unique": true,
        "type": "date",
        "required": true
      },
      "updated_at": {
        "name": "Last modified",
        "unique": true,
        "type": "date",
        "required": true
      },
      "published_on": {
        "name": "Publication Date",
        "unique": true,
        "type": "date"
      },
      "settings": {
		    "name": "Document Settings",
		    "unique": true,
		    "type": "object"
	    },
	    "views": {
		    "name": "View Count",
		    "unique": true,
		    "type": "number",
		    "default": 0
	    },
  	  "subscribers": {
    		"name": "Subscribers",
    		"unique": true,
    		"type": "number",
    		"default": 0
  	  },
  	  "subscribed": {
    		"name": "Subscribed by current user (meta-attribute)",
    		"unique": true,
    		"type": "boolean"
  	  },
      "subjects": {
        "type": ["/type/attribute"],
        "name": "Subjects",
        "unique": false,
        "default": [],
        "meta": {
          "facet": true
        }
      },
      "entities": {
        "type": ["/type/attribute"],
        "name": "Entities mentioned",
        "unique": false,
        "default": [],
        "meta": {
          "facet": true
        }
      }
    },
    "indexes": {
      "key": ["creator", "name"]
    }
  },

  "/type/qaa": {
    "type": "/type/type",
    "name": "Q&A",
    "properties": {
      "children": {
        "name": "Children/Contents",
        "unique": false,
        "type": ["/type/question", "/type/answer"],
        "default": []
      }
    },
    "meta": {
      "template": {
        "type": ["/type/document", "/type/qaa"]
      }
    }
  },

  "/type/manual": {
    "type": "/type/type",
    "name": "Manual",
    "properties": {
      "children": {
        "name": "Children/Contents",
        "unique": false,
        "type": ["/type/section"],
        "default": []
      }
    },
    "meta": {
      "template": {
        "type": ["/type/document", "/type/manual"]
      }
    }
  },

  "/type/article": {
    "type": "/type/type",
    "name": "Article",
    "properties": {
      "children": {
        "name": "Children/Contents",
        "unique": false,
        "type": ["/type/section", "/type/text", "/type/image", "/type/resource", "/type/quote", "/type/code"],
        "default": []
      }
    },
    "meta": {
      "template": {
        "type": ["/type/document", "/type/article"]
      }
    }
  },

  "/type/section": {
    "_id": "/type/section",
    "type": "/type/type",
    "name": "Section",
    "properties": {
      "name": {
        "name": "Name",
        "unique": true,
        "type": "string",
        "default": ""
      },
      "document": {
        "name": "Document Membership",
        "unique": true,
        "required": true,
        "type": ["/type/document"]
      },
      "children": {
        "name": "Children",
        "unique": false,
        "type": ["/type/text", "/type/image", "/type/resource", "/type/quote", "/type/code", "/type/section"],
        "default": []
      },
      "comments": {
        "name": "Comments",
        "unique": false,
        "type": ["/type/comment"],
        "default": []
      }
    }
  },

  "/type/text": {
    "_id": "/type/text",
    "type": "/type/type",
    "name": "Text",
    "properties": {
      "content": {
        "name": "Content",
        "unique": true,
        "type": "string",
        "default": "<p></p>"
      },
      "comments": {
        "name": "Comments",
        "unique": false,
        "type": ["/type/comment"],
        "default": []
      },
      "document": {
        "name": "Document Membership",
        "unique": true,
        "required": true,
        "type": ["/type/document"]
      }
    }
  },

  "/type/visualization": {
    "_id": "/type/visualization",
    "type": "/type/type",
    "name": "Visualization",
    "properties": {
      "data_source": {
        "name": "Data Source",
        "unique": true,
        "type": "string",
        "required": true,
        "default": "http://dejavis.org/files/linechart/data/countries.json"
      },
      "visualization_type": {
        "name": "Visualization Type",
        "unique": true,
        "type": "string",
        "required": true,
        "default": "linechart"
      },
      "comments": {
        "name": "Comments",
        "unique": false,
        "type": ["/type/comment"],
        "default": []
      },
      "document": {
        "name": "Document Membership",
        "unique": true,
        "required": true,
        "type": ["/type/document"]
      }
    }
  },

  "/type/question": {
    "_id": "/type/question",
    "type": "/type/type",
    "name": "Question",
    "properties": {
      "content": {
        "name": "Content",
        "unique": true,
        "type": "string",
        "default": ""
      },
      "document": {
        "name": "Document Membership",
        "unique": true,
        "required": true,
        "type": ["/type/document"]
      },
      "comments": {
        "name": "Comments",
        "unique": false,
        "type": ["/type/comment"],
        "default": []
      }
    }
  },

  "/type/answer": {
    "_id": "/type/answer",
    "type": "/type/type",
    "name": "Answer",
    "properties": {
      "content": {
        "name": "Content",
        "unique": true,
        "type": "string",
        "default": ""
      },
      "document": {
        "name": "Document Membership",
        "unique": true,
        "required": true,
        "type": ["/type/document"]
      },
      "comments": {
        "name": "Comments",
        "unique": false,
        "type": ["/type/comment"],
        "default": []
      }
    }
  },

  "/type/quote": {
    "_id": "/type/quote",
    "type": "/type/type",
    "name": "Quote",
    "properties": {
      "author": {
        "name": "Quote Author",
        "unique": true,
        "type": "string",
        "default": ""
      },
      "content": {
        "name": "Content",
        "unique": true,
        "type": "string",
        "default": ""
      },
      "document": {
        "name": "Document Membership",
        "unique": true,
        "required": true,
        "type": ["/type/document"]
      },
      "comments": {
        "name": "Comments",
        "unique": false,
        "type": ["/type/comment"],
        "default": []
      }
    }
  },

  "/type/code": {
    "_id": "/type/code",
    "type": "/type/type",
    "name": "Code",
    "properties": {
      "content": {
        "name": "Content",
        "unique": true,
        "type": "string",
        "default": ""
      },
      "document": {
        "name": "Document Membership",
        "unique": true,
        "required": true,
        "type": ["/type/document"]
      },
      "comments": {
        "name": "Comments",
        "unique": false,
        "type": ["/type/comment"],
        "default": []
      }
    }
  },

  "/type/image": {
    "_id": "/type/image",
    "type": "/type/type",
    "name": "Image",
    "properties": {
      "caption": {
        "name": "Image Caption",
        "unique": true,
        "type": "string"
      },
      "url": {
        "name": "Image URL",
        "unique": true,
        "type": "string"
      },
      "original_url": {
        "name": "Original Image URL",
        "unique": true,
        "type": "string"
      },
      "document": {
        "name": "Document Membership",
        "unique": true,
        "required": true,
        "type": ["/type/document"]
      },
      "comments": {
        "name": "Comments",
        "unique": false,
        "type": ["/type/comment"],
        "default": []
      }
    }
  },

  "/type/resource": {
    "_id": "/type/image",
    "type": "/type/type",
    "name": "Resource",
    "properties": {
      "caption": {
        "name": "Caption",
        "unique": true,
        "type": "string"
      },
      "url": {
        "name": "Resource URL",
        "unique": true,
        "type": "string"
      },
      "document": {
        "name": "Document Membership",
        "unique": true,
        "required": true,
        "type": ["/type/document"]
      },
      "comments": {
        "name": "Comments",
        "unique": false,
        "type": ["/type/comment"],
        "default": []
      }
    }
  }
};
