-- 用户账号密码表
drop table if exists t_user;
create table t_user (
  id int primary key auto_increment,
  userName varchar(32) unique not null,
  password varchar(64) not null,
  createTime varchar(19) not null,
  updateTime varchar(19)
);

-- 用户信息表
drop table if exists t_information;
create table t_information (
  id int primary key auto_increment,
  nikeName varchar(64) default '' not null unique,
  realName varchar(64) default '',
  phone varchar(32) unique,
  country varchar(32) default '',
  national varchar(32) default '',
  `address` varchar(256) default '',
  hobby varchar(256) default '',
  job varchar(256) default '',
  email varchar(256) default '' unique,
  `signature` varchar(256) default '',
  `profile` varchar(256) default '',
  defaultGroup varchar(256) default '1,2,3,4,5',
  birthday varchar(19),
  gender varchar(4) default '未知',
  foreign key (id) references t_user (id)
);

-- 用户登录 token 表
drop table if exists t_token;
create table t_token (
  id int primary key auto_increment,
  user_id int not null,
  token varchar(256) not null unique,
  createTime Date,
  expireTime Date,
  foreign key (user_id) references t_user(id)
);

-- 文件夹表
drop table if exists t_folder;
create table t_folder (
  id int primary key auto_increment,
  userId int not null,
  fname varchar(256) default '未命名的文件夹',
  descr varchar(256),
  createTime varchar(19) not null,
  updateTime varchar(19),
  foreign key (userId) references t_user(id)
);

-- 分组表
drop table if exists t_group;
create table t_group (
  id int primary key auto_increment,
  userId int not null,
  folderId int,
  icon varchar(32),
  gname varchar(256) not null,
  descr varchar(256),
  createTime varchar(19) not null,
  updateTime varchar(19),
  foreign key (userId) references t_user(id),
  foreign key (folderId) references t_folder(id)
);

-- todo 表
drop table if exists t_todo;
create table t_todo (
  id int primary key auto_increment,
  groupId int not null,
  done int default 0,
  star int default 0,
  content varchar(256) default '',
  note varchar(256) default '',
  createTime varchar(19) not null,
  updateTime varchar(19),
  scheduledTime varchar(19),
  foreign key(groupId) references t_group(id)
);

-- step 表
drop table if exists t_step;
create table t_step (
  id int primary key auto_increment,
  todoId int not null,
  seqNo int not null,
  descr varchar(256) default '',
  done int default 0,
  createTime varchar(19) not null,
  updateTime varchar(19),
  foreign key(todoId) references t_todo(id)
);