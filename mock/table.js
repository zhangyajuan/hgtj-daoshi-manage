import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})
const studentList = [{
  id: 20190001,
  name: '张三',
  school: '清华大学',
  major: '土木工程',
  hasTeacher: '是'
},
{
  id: 20190002,
  name: '张三',
  school: '清华大学',
  major: '土木工程',
  hasTeacher: '是'
},
{
  id: 20190003,
  name: '张三',
  school: '清华大学',
  major: '土木工程',
  hasTeacher: '是'
},
{
  id: 20190004,
  name: '张三',
  school: '清华大学',
  major: '土木工程',
  hasTeacher: '是'
}
];
const teacherList = [{
  avatar: 'https://hgbc-daoshi.oss-cn-beijing.aliyuncs.com/daoshi/avatar/huyudong.jpg?v=1',
  name: '胡宇东',
  school_name: "中国人民大学",
  title: '和光同聚集团董事长',
  id: 1,
  words: '给学员的一段话',
  desc: `<p>胡宇东本科毕业于中国人民大学，研究生毕业于清华大学经管学院，EMBA师从北大国发院陈春花教授。</p>
<p>毕业后2006年胡宇东进入普华永道成为管培生，2007年进入汇丰集团香港恒生银行作为管培生，2008年进入壳牌中国成为管培生。</p>
<p>胡宇东具有十年教育行业创业与投资经验，率先开创K12领域双师教学模式，并曾代表清华大学获得全球商学院创业比赛大奖，先后投资孵化了鹦鹉螺教育、半间教室等多家互联网教育企业作为产业投资人，胡宇东参与发起百亿人民币规模元知资本与和光同聚人才教育产业基金，致力于通过产融结合模式，打造全球最大人力资源和教育产业生态，先后战略投资金岭联通沃素养、魔方微猎等多个优质项目。投资范围围绕人的终生学习发展轨迹，覆盖早幼教、基础教育、高等教育、职业教育、教育科技、企业服务、人力资源服务全产业链。目前主要关注中后期战略投资和并购重组。</p>
<p>胡宇东作为清华大学X-Lab早期发起者之一，长期参与辅导和帮助教育领域创业者成长。并作为评委和指导老师参与科技部火炬中心和人民大学、清华大学双创活动。2016年，胡宇东老师获评中国民办教育行业十大明星导师、2017年获评创业黑马十大明星导师。同时，作为教育行业的资深实践者和投资人，胡宇东老师一直保持对行业趋势的深度思考和经验提炼，著有《做孩子最好的老师》。</p>`
},
{
  avatar: 'https://hgbc-daoshi.oss-cn-beijing.aliyuncs.com/daoshi/avatar/mazheng.jpg?v=1',
  name: '马正',
  school_name: "北京大学",
  title: '律格资本创始人',
  id: 2,
  words: null,
  desc: `<p>毕业于北京大学法学院，律格资本创始人，投资、法律和创业圈的跨界人士，同时拿了北大毕业生标配的经济学双学位，三年后于美国常春藤康奈尔大学获得法律博士学位。归国后，央行外汇储备经营部门工作4年有余。参与国家4万亿外汇储备的海外投资和法律事务，与华尔街顶级私募基金和对冲基金数次项目合作，海外投资和风控经验丰富。</p>
<p>2015年底与合伙人创立律格资本，业务包括中美科技独角兽股权投资、教育和医疗并购基金和家族办公室业务。2016年完成的投资包括滴滴打车、Magc Leap等。</p>`
},
{
  avatar: 'https://hgbc-daoshi.oss-cn-beijing.aliyuncs.com/daoshi/avatar/lida.jpg?v=1',
  name: '李达',
  school_name: "清华大学",
  title: '拾贝投资投资顾问',
  id: 3,
  words: null,
  desc: `<p>拾贝投资首席投资顾问/投资者关系部总监清华大学经济管理学院管理学学士，硕士，</p>
<p>12年基金从业经验，曾任建信基金渠道主管，2014年加入拾贝投资，现任拾贝投资首席投资顾问，投资者关系部总监，拥有丰富的资产管理行业理论及实践经验，多次参与基金行业规则修订，主讲上千场投资策略会。拾贝核心投研团队过去13年长期管理百亿以上规模资金，年化复合收益超过20%，累计为客户创造超过10倍回报，目前已经跻身国内头部私募行列。</p>`
}	
];
const recommendList = [{
  s_name: '张三',
  t_name: '胡宇东',
  school: '清华大学',
  major: '土木工程',
  status: '待审核'
},
{
  s_name: '李四',
  t_name: '胡宇东',
  school: '清华大学',
  major: '土木工程',
  status: '待审核'
},
{
  s_name: '王五',
  t_name: '胡宇东',
  school: '清华大学',
  major: '土木工程',
  status: '待审核'
},
{
  s_name: '赵六',
  t_name: '胡宇东',
  school: '清华大学',
  major: '土木工程',
  status: '审核通过'
}
];
export default [
  {
    url: '/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/student/list',
    type: 'get',
    response: config => {
      const items = studentList
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/teacher/list',
    type: 'get',
    response: config => {
      const items = teacherList
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/recommend/list',
    type: 'get',
    response: config => {
      const items = recommendList
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
