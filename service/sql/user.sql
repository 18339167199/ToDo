insert into t_user (
  userName, password, createTime
) values (
  'root', '123456', '2022-04-23 00:00:00'
);

insert into t_information (
  nikeName,
  realName,
  phone,
  email,
  national,
  address,
  gender
)
values (
  'admin',
  '李茂斌',
  '18339167199',
  '18339167199@163.com',
  '汉族',
  '广东省, 深圳市, 龙岗区',
  '男'
);
update t_information
  set country = '中国', hobby = '屠龙传说', job = 'Web 前端', signature = 'WDNMD'
where
  id = 1;