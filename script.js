const quests = [
  {
    id: "rain",
    title: "城市暴雨预警",
    code: "洪涝",
    scene: "你加入市气象中心的学生研究组，要判断 AI 模型能否提前提醒低洼片区。",
    tags: ["地理", "公共安全", "数据质量"],
    color: "#1f8a70",
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
    id: "canteen",
    title: "校园食堂减浪费",
    code: "校园",
    scene: "校长希望用 AI 预测每天各窗口备餐量，减少浪费，又不能让同学买不到饭。",
    tags: ["校园生活", "预测", "权衡"],
    color: "#2563eb",
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
    id: "vision",
    title: "青少年近视筛查",
    code: "健康",
    scene: "社区医院想用 AI 辅助筛查视力风险，你需要判断它能不能作为医生助手。",
    tags: ["生命健康", "隐私", "评估"],
    color: "#d94a38",
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
    title: "非遗图像识别",
    code: "文化",
    scene: "博物馆想让学生用 AI 识别剪纸、蜡染和木版年画，帮助观众理解传统工艺。",
    tags: ["文化传承", "计算机视觉", "偏差"],
    color: "#a35d13",
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

const state = {
  activeQuest: quests[0],
  completed: new Set(JSON.parse(localStorage.getItem("aiQuestCompleted") || "[]")),
  score: Number(localStorage.getItem("aiQuestScore") || 0)
};

const questGrid = document.querySelector("#questGrid");
const labIntro = document.querySelector("#labIntro");
const missionMeta = document.querySelector("#missionMeta");
const dataPrompt = document.querySelector("#dataPrompt");
const dataOptions = document.querySelector("#dataOptions");
const quizQuestion = document.querySelector("#quizQuestion");
const quizOptions = document.querySelector("#quizOptions");
const feedback = document.querySelector("#feedback");
const trainingRange = document.querySelector("#trainingRange");
const epochValue = document.querySelector("#epochValue");
const accuracyMeter = document.querySelector("#accuracyMeter");
const falseAlarmMeter = document.querySelector("#falseAlarmMeter");
const accuracyValue = document.querySelector("#accuracyValue");
const falseAlarmValue = document.querySelector("#falseAlarmValue");
const completedCount = document.querySelector("#completedCount");
const scoreValue = document.querySelector("#scoreValue");
const badgeValue = document.querySelector("#badgeValue");

function renderQuestCards() {
  questGrid.innerHTML = quests
    .map((quest) => {
      const isActive = quest.id === state.activeQuest.id ? " active" : "";
      const done = state.completed.has(quest.id) ? "已完成" : "开始";
      return `
        <button class="quest-card${isActive}" type="button" data-id="${quest.id}">
          <div class="quest-image" style="background: linear-gradient(135deg, ${quest.color}, #10231f)">
            <span>${quest.code}</span>
          </div>
          <div class="quest-body">
            <h3>${quest.title}</h3>
            <p>${quest.scene}</p>
            <div class="quest-tags">
              ${quest.tags.map((tag) => `<span>${tag}</span>`).join("")}
              <span>${done}</span>
            </div>
          </div>
        </button>
      `;
    })
    .join("");

  document.querySelectorAll(".quest-card").forEach((card) => {
    card.addEventListener("click", () => {
      state.activeQuest = quests.find((quest) => quest.id === card.dataset.id);
      feedback.textContent = "";
      render();
      document.querySelector("#lab").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderLab() {
  const quest = state.activeQuest;
  labIntro.textContent = quest.scene;
  missionMeta.innerHTML = quest.tags.map((tag) => `<span>${tag}</span>`).join("");
  dataPrompt.textContent = quest.prompt;
  quizQuestion.textContent = quest.quiz;

  dataOptions.innerHTML = quest.data
    .map((option, index) => `<button class="option-button" type="button" data-data="${index}">${option.text}</button>`)
    .join("");
  quizOptions.innerHTML = quest.answers
    .map((option, index) => `<button class="option-button" type="button" data-answer="${index}">${option.text}</button>`)
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
      if (option.correct) {
        state.completed.add(quest.id);
        addScore(12, "任务完成。你做出的不是单纯技术选择，而是负责任的上线判断。");
      } else {
        feedback.textContent = "这一步要把准确率、风险人群和真实后果放在一起看。";
      }
      persist();
      renderProgress();
      renderQuestCards();
    });
  });
}

function markChoice(button, correct) {
  const siblings = button.parentElement.querySelectorAll(".option-button");
  siblings.forEach((item) => {
    item.classList.remove("correct", "wrong");
  });
  button.classList.add(correct ? "correct" : "wrong");
}

function addScore(points, message) {
  state.score += points;
  feedback.textContent = `${message} +${points} 积分`;
  persist();
  renderProgress();
}

function renderTraining() {
  const epochs = Number(trainingRange.value);
  const accuracy = Math.min(94, 58 + epochs * 5 + (state.activeQuest.id.length % 3) * 2);
  const falseAlarm = Math.max(7, 34 - epochs * 2);
  epochValue.textContent = epochs;
  accuracyMeter.style.width = `${accuracy}%`;
  falseAlarmMeter.style.width = `${falseAlarm}%`;
  accuracyValue.textContent = `${accuracy}%`;
  falseAlarmValue.textContent = `${falseAlarm}%`;
}

function renderProgress() {
  completedCount.textContent = state.completed.size;
  scoreValue.textContent = state.score;
  badgeValue.textContent = state.score >= 80 ? "首席" : state.score >= 40 ? "进阶" : "新手";
}

function persist() {
  localStorage.setItem("aiQuestCompleted", JSON.stringify([...state.completed]));
  localStorage.setItem("aiQuestScore", String(state.score));
}

function render() {
  renderQuestCards();
  renderLab();
  renderTraining();
  renderProgress();
}

trainingRange.addEventListener("input", renderTraining);

document.querySelector("#resetProgress").addEventListener("click", () => {
  state.completed.clear();
  state.score = 0;
  persist();
  feedback.textContent = "进度已重置。可以重新开始一次研究员挑战。";
  render();
});

render();
