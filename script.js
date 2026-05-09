const zones = [
  {
    id: "city",
    name: "城市安全区",
    description: "用 AI 观察天气、交通和公共安全风险。",
    accent: "#1f8a70"
  },
  {
    id: "campus",
    name: "校园生活区",
    description: "让模型服务校园，但不能忽略每一个同学。",
    accent: "#2563eb"
  },
  {
    id: "health",
    name: "健康守护区",
    description: "理解隐私、专业判断和 AI 辅助的边界。",
    accent: "#d94a38"
  },
  {
    id: "culture",
    name: "文化博物馆区",
    description: "用计算机视觉理解传统文化和数据偏差。",
    accent: "#a35d13"
  }
];

const quests = [
  {
    id: "rain",
    zone: "city",
    title: "城市暴雨预警",
    code: "洪涝",
    scene: "暴雨即将来临，你加入市气象中心学生研究组，要判断 AI 模型能否提前提醒低洼片区。",
    tags: ["地理", "公共安全", "数据质量"],
    color: "#1f8a70",
    concept: { title: "数据代表性", text: "训练数据要覆盖真实世界里的不同地点、人群和场景，否则模型会在被忽略的地方犯错。" },
    badge: { id: "data-detective", title: "数据侦探", icon: "🕵️" },
    prompt: "下面哪份数据最适合训练暴雨积水预警模型？",
    data: [
      { text: "过去三年每小时降雨、河道水位、道路积水点和地势数据", correct: true },
      { text: "只记录了十场特大暴雨当天的新闻标题", correct: false },
      { text: "同学们对天气热不热的主观打分", correct: false }
    ],
    quiz: "模型准确率很高，但总在老城区低估积水风险。上线前最该做什么？",
    answers: [
      { text: "补充老城区传感器和历史积水样本，再分区域评估", correct: true },
      { text: "直接上线，因为总体准确率已经足够高", correct: false },
      { text: "删除老城区数据，让结果看起来更稳定", correct: false }
    ]
  },
  {
    id: "traffic",
    zone: "city",
    title: "智慧交通信号灯",
    code: "交通",
    scene: "城市 AI 中心想让路口信号灯自动调整，你要避免效率提升变成新的不公平。",
    tags: ["交通", "阈值", "公平"],
    color: "#0f766e",
    concept: { title: "优化目标", text: "AI 优化什么，就会牺牲什么。只优化车流速度，可能会忽略行人、老人和骑行者。" },
    badge: { id: "fairness-guard", title: "公平守护者", icon: "⚖️" },
    prompt: "训练交通信号模型时，哪项数据最不能少？",
    data: [
      { text: "车流量、行人等待时间、事故记录、学校医院等特殊路段信息", correct: true },
      { text: "只统计主干道汽车平均速度", correct: false },
      { text: "司机对红绿灯颜色喜好的投票", correct: false }
    ],
    quiz: "模型让汽车通行更快，但老人过马路等待更久。你会建议？",
    answers: [
      { text: "加入行人安全和特殊人群等待时间约束，再重新评估", correct: true },
      { text: "继续上线，因为汽车数量更多", correct: false },
      { text: "关闭所有人行横道数据，避免影响效率", correct: false }
    ]
  },
  {
    id: "canteen",
    zone: "campus",
    title: "校园食堂减浪费",
    code: "校园",
    scene: "校长希望用 AI 预测每天各窗口备餐量，减少浪费，又不能让同学买不到饭。",
    tags: ["校园生活", "预测", "权衡"],
    color: "#2563eb",
    concept: { title: "预测与保障", text: "预测模型可以提升效率，但涉及基本需求时，要保留最低保障和人工反馈通道。" },
    badge: { id: "campus-optimizer", title: "校园优化师", icon: "🍱" },
    prompt: "哪项数据最能帮助模型预测午餐需求？",
    data: [
      { text: "课程表、天气、历史销量、考试周和社团活动安排", correct: true },
      { text: "每个窗口墙面的颜色和餐盘尺寸", correct: false },
      { text: "随机抽取一天的剩菜重量", correct: false }
    ],
    quiz: "模型建议减少某窗口备餐，但这个窗口是少数民族餐。合理做法是？",
    answers: [
      { text: "设置最低供应保障，并让相关学生参与反馈", correct: true },
      { text: "完全按模型结果执行，效率最重要", correct: false },
      { text: "取消所有预测，回到人工猜测", correct: false }
    ]
  },
  {
    id: "homework",
    zone: "campus",
    title: "AI 作业反馈助手",
    code: "作业",
    scene: "班级想用 AI 给作文草稿提建议。你要判断它能不能替代老师评分。",
    tags: ["生成式 AI", "反馈", "人类监督"],
    color: "#4f46e5",
    concept: { title: "人类监督", text: "AI 可以辅助反馈，但涉及评价、惩罚和重要决定时，人类需要保留最终判断权。" },
    badge: { id: "human-in-loop", title: "人机协作官", icon: "🤝" },
    prompt: "哪种使用方式更适合作文 AI 反馈？",
    data: [
      { text: "让 AI 提出结构和表达建议，学生修改后由老师综合评价", correct: true },
      { text: "让 AI 自动给最终分数，老师不用再看", correct: false },
      { text: "只用一篇满分作文训练所有反馈", correct: false }
    ],
    quiz: "AI 把有方言表达的作文判成“语言错误多”。你会怎么处理？",
    answers: [
      { text: "检查评价标准是否偏向单一表达，并让老师复核反馈", correct: true },
      { text: "要求所有学生都按 AI 喜欢的风格写", correct: false },
      { text: "删除方言相关内容，避免模型困惑", correct: false }
    ]
  },
  {
    id: "vision",
    zone: "health",
    title: "青少年近视筛查",
    code: "健康",
    scene: "社区医院想用 AI 辅助筛查视力风险，你需要判断它能不能作为医生助手。",
    tags: ["生命健康", "隐私", "评估"],
    color: "#d94a38",
    concept: { title: "隐私保护", text: "健康数据属于敏感信息，收集前要获得授权，并尽量去标识化、最小化使用。" },
    badge: { id: "privacy-shield", title: "隐私守护者", icon: "🛡️" },
    prompt: "用于训练的学生健康数据应优先满足哪项要求？",
    data: [
      { text: "获得授权、去标识化，并覆盖不同年龄和地区", correct: true },
      { text: "越多越好，不需要说明用途", correct: false },
      { text: "只收集视力最差学生的数据，方便模型学习", correct: false }
    ],
    quiz: "AI 提示某学生高风险，但医生检查认为暂不严重。学生应得到什么信息？",
    answers: [
      { text: "AI 只是辅助建议，最终由专业医生结合检查判断", correct: true },
      { text: "AI 一定比医生准确，必须立刻治疗", correct: false },
      { text: "不需要告诉学生模型可能出错", correct: false }
    ]
  },
  {
    id: "heritage",
    zone: "culture",
    title: "非遗图像识别",
    code: "文化",
    scene: "博物馆想让学生用 AI 识别剪纸、蜡染和木版年画，帮助观众理解传统工艺。",
    tags: ["文化传承", "计算机视觉", "偏差"],
    color: "#a35d13",
    concept: { title: "模型偏差", text: "样本少、来源窄或标注不准确，会让模型更容易误解少数群体和小众文化。" },
    badge: { id: "bias-finder", title: "偏差发现者", icon: "🔎" },
    prompt: "哪组图片更适合训练非遗识别模型？",
    data: [
      { text: "不同地区、光线、年代和拍摄角度的授权作品图片", correct: true },
      { text: "同一个展柜里拍摄的二十张同款剪纸", correct: false },
      { text: "没有来源说明的网络图片合集", correct: false }
    ],
    quiz: "模型总把少数地区的蜡染识别成普通蓝布。研究组该如何改进？",
    answers: [
      { text: "邀请传承人标注样本，补充地区差异并记录来源", correct: true },
      { text: "把少数地区类别合并掉，减少模型难度", correct: false },
      { text: "只展示模型擅长识别的类别", correct: false }
    ]
  }
];

const storageKeys = {
  completed: "aiQuestCompleted",
  score: "aiQuestScore",
  badges: "aiQuestBadges",
  concepts: "aiQuestConcepts"
};

const state = {
  activeQuest: quests[0],
  completed: new Set(JSON.parse(localStorage.getItem(storageKeys.completed) || "[]")),
  badges: new Set(JSON.parse(localStorage.getItem(storageKeys.badges) || "[]")),
  concepts: new Set(JSON.parse(localStorage.getItem(storageKeys.concepts) || "[]")),
  score: Number(localStorage.getItem(storageKeys.score) || 0)
};

const zoneGrid = document.querySelector("#zoneGrid");
const labIntro = document.querySelector("#labIntro");
const missionMeta = document.querySelector("#missionMeta");
const dataPrompt = document.querySelector("#dataPrompt");
const dataOptions = document.querySelector("#dataOptions");
const quizQuestion = document.querySelector("#quizQuestion");
const quizOptions = document.querySelector("#quizOptions");
const feedback = document.querySelector("#feedback");
const trainingRange = document.querySelector("#trainingRange");
const trainingHint = document.querySelector("#trainingHint");
const epochValue = document.querySelector("#epochValue");
const accuracyMeter = document.querySelector("#accuracyMeter");
const falseAlarmMeter = document.querySelector("#falseAlarmMeter");
const accuracyValue = document.querySelector("#accuracyValue");
const falseAlarmValue = document.querySelector("#falseAlarmValue");
const completedCount = document.querySelector("#completedCount");
const scoreValue = document.querySelector("#scoreValue");
const badgeValue = document.querySelector("#badgeValue");
const profileRank = document.querySelector("#profileRank");
const profileNext = document.querySelector("#profileNext");
const badgeList = document.querySelector("#badgeList");
const conceptList = document.querySelector("#conceptList");
const resultModal = document.querySelector("#resultModal");
const resultSummary = document.querySelector("#resultSummary");
const resultBadge = document.querySelector("#resultBadge");
const resultConcept = document.querySelector("#resultConcept");

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
}

function getRank() {
  if (state.score >= 120) return { short: "首席", full: "首席 AI 研究员", next: "你已经完成当前训练营，可以挑战自己设计新任务。" };
  if (state.score >= 70) return { short: "进阶", full: "进阶研究员", next: "继续完成任务，向首席 AI 研究员前进。" };
  if (state.score >= 30) return { short: "见习", full: "见习研究员", next: "再完成 2 个任务，解锁更多概念卡。" };
  return { short: "新手", full: "新手研究员", next: "完成第一个任务，解锁你的第一枚徽章。" };
}

function persist() {
  localStorage.setItem(storageKeys.completed, JSON.stringify([...state.completed]));
  localStorage.setItem(storageKeys.badges, JSON.stringify([...state.badges]));
  localStorage.setItem(storageKeys.concepts, JSON.stringify([...state.concepts]));
  localStorage.setItem(storageKeys.score, String(state.score));
}

function renderMap() {
  zoneGrid.innerHTML = zones.map((zone) => {
    const zoneQuests = quests.filter((quest) => quest.zone === zone.id);
    const nodes = zoneQuests.map((quest) => {
      const done = state.completed.has(quest.id);
      const active = quest.id === state.activeQuest.id;
      return `
        <button class="quest-node${done ? " done" : ""}${active ? " active" : ""}" type="button" data-id="${quest.id}">
          <span class="node-code">${escapeHtml(quest.code)}</span>
          <strong>${escapeHtml(quest.title)}</strong>
          <small>${done ? "已点亮" : "待探索"}</small>
        </button>
      `;
    }).join("");

    return `
      <article class="zone-card" style="--zone: ${zone.accent}">
        <div class="zone-header">
          <div>
            <h3>${escapeHtml(zone.name)}</h3>
            <p>${escapeHtml(zone.description)}</p>
          </div>
          <span>${zoneQuests.filter((quest) => state.completed.has(quest.id)).length}/${zoneQuests.length}</span>
        </div>
        <div class="quest-path">${nodes}</div>
      </article>
    `;
  }).join("");

  document.querySelectorAll(".quest-node").forEach((node) => {
    node.addEventListener("click", () => {
      state.activeQuest = quests.find((quest) => quest.id === node.dataset.id);
      feedback.textContent = "";
      render();
      document.querySelector("#lab").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderLab() {
  const quest = state.activeQuest;
  labIntro.textContent = quest.scene;
  missionMeta.innerHTML = quest.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
  dataPrompt.textContent = quest.prompt;
  quizQuestion.textContent = quest.quiz;
  trainingHint.textContent = `你正在调试「${quest.title}」模型。训练轮次越多，准确率通常提升，但误报率不一定完全消失。`;

  dataOptions.innerHTML = quest.data
    .map((option, index) => `<button class="option-button" type="button" data-data="${index}">${escapeHtml(option.text)}</button>`)
    .join("");
  quizOptions.innerHTML = quest.answers
    .map((option, index) => `<button class="option-button" type="button" data-answer="${index}">${escapeHtml(option.text)}</button>`)
    .join("");

  document.querySelectorAll("[data-data]").forEach((button) => {
    button.addEventListener("click", () => {
      const option = quest.data[Number(button.dataset.data)];
      markChoice(button, option.correct);
      if (option.correct) addScore(8, "数据判断正确。好研究员先问数据从哪来、代表谁、缺了谁。");
      else feedback.textContent = "再想想：模型不是魔法，训练数据如果片面，答案也会片面。";
    });
  });

  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const option = quest.answers[Number(button.dataset.answer)];
      markChoice(button, option.correct);
      if (option.correct) completeQuest(quest);
      else feedback.textContent = "这一步要把准确率、风险人群和真实后果放在一起看。";
    });
  });
}

function markChoice(button, correct) {
  button.parentElement.querySelectorAll(".option-button").forEach((item) => {
    item.classList.remove("correct", "wrong");
  });
  button.classList.add(correct ? "correct" : "wrong");
}

function addScore(points, message) {
  state.score += points;
  feedback.textContent = `${message} +${points} 积分`;
  persist();
  renderProgress();
  renderProfile();
}

function completeQuest(quest) {
  const firstCompletion = !state.completed.has(quest.id);
  state.completed.add(quest.id);
  state.badges.add(quest.badge.id);
  state.concepts.add(quest.id);
  addScore(firstCompletion ? 18 : 6, firstCompletion ? "任务完成。你做出了负责任的上线判断。" : "复盘成功。重复挑战也能巩固判断。");
  persist();
  render();
  showResult(quest, firstCompletion);
}

function showResult(quest, firstCompletion) {
  resultSummary.textContent = firstCompletion
    ? `你完成了「${quest.title}」，点亮了一个地图节点。`
    : `你再次完成了「${quest.title}」，这次是一次研究复盘。`;
  resultBadge.textContent = `${quest.badge.icon} ${quest.badge.title}`;
  resultConcept.textContent = quest.concept.title;
  if (typeof resultModal.showModal === "function") resultModal.showModal();
}

function renderTraining() {
  const epochs = Number(trainingRange.value);
  const accuracy = Math.min(94, 58 + epochs * 5 + (state.activeQuest.id.length % 3) * 2);
  const falseAlarm = Math.max(7, 34 - epochs * 2 + (state.activeQuest.zone === "health" ? 2 : 0));
  epochValue.textContent = epochs;
  accuracyMeter.style.width = `${accuracy}%`;
  falseAlarmMeter.style.width = `${falseAlarm}%`;
  accuracyValue.textContent = `${accuracy}%`;
  falseAlarmValue.textContent = `${falseAlarm}%`;
}

function renderProgress() {
  const rank = getRank();
  completedCount.textContent = state.completed.size;
  scoreValue.textContent = state.score;
  badgeValue.textContent = rank.short;
}

function renderProfile() {
  const rank = getRank();
  profileRank.textContent = rank.full;
  profileNext.textContent = rank.next;

  const earnedBadges = quests
    .filter((quest) => state.badges.has(quest.badge.id))
    .map((quest) => quest.badge);
  badgeList.innerHTML = earnedBadges.length
    ? earnedBadges.map((badge) => `<span class="badge-chip"><b>${badge.icon}</b>${escapeHtml(badge.title)}</span>`).join("")
    : `<span class="empty-state">还没有徽章。完成第一个任务就能点亮。</span>`;

  const unlockedConcepts = quests.filter((quest) => state.concepts.has(quest.id));
  conceptList.innerHTML = unlockedConcepts.length
    ? unlockedConcepts.map((quest) => `
        <article class="concept-card">
          <strong>${escapeHtml(quest.concept.title)}</strong>
          <p>${escapeHtml(quest.concept.text)}</p>
        </article>
      `).join("")
    : `<span class="empty-state">完成任务后会解锁 AI 概念卡。</span>`;
}

function render() {
  renderMap();
  renderLab();
  renderTraining();
  renderProgress();
  renderProfile();
}

trainingRange.addEventListener("input", renderTraining);

document.querySelector("#resetProgress").addEventListener("click", () => {
  if (!window.confirm("确定要清空当前浏览器里的闯关进度吗？")) return;
  state.completed.clear();
  state.badges.clear();
  state.concepts.clear();
  state.score = 0;
  persist();
  feedback.textContent = "进度已重置。可以重新开始一次研究员挑战。";
  render();
});

document.querySelector("#closeModal").addEventListener("click", () => resultModal.close());
document.querySelector("#nextQuestLink").addEventListener("click", () => resultModal.close());
document.querySelector("#profileLink").addEventListener("click", () => resultModal.close());

render();
