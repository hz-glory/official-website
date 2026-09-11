export type LabeledOption = {
  value: string;
  zh: string;
  en: string;
};

export type ComputeInquiry = {
  company: string;
  creditCode?: string;
  registeredCapital?: string;
  revenueRange?: string;
  companyType: string[];
  companyTypeOther?: string;
  businessDesc?: string;
  contactTitle?: string;
  contactPhone: string;
  decisionMaker?: string;
  contactRole: string[];
  acquireMode: string[];
  gpuModels: string[];
  machineCount: string;
  gpusPerMachine?: string;
  network: string[];
  storage: string[];
  software: string[];
  softwareOther?: string;
  batchDelivery: string[];
  location: string[];
  usages: string[];
  usageOther?: string;
  loadPattern: string[];
  existingPlatform: string[];
  projectBackground?: string;
  contractTerm: string[];
  paymentStructure: string[];
  budgetRange: string[];
  contractingEntity?: string;
  fundingSource: string[];
  invoice: string[];
  invoiceNote?: string;
  earliestDate: string;
  latestDate?: string;
  urgency: string[];
  acceptForward: string[];
  hardDeadline: string[];
  hardDeadlineDate?: string;
  phasedDelivery: string[];
  compliance: string[];
  supplierQual: string[];
  extraNotes?: string;
};

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function opt(value: string, zh: string, en: string): LabeledOption {
  return { value, zh, en };
}

export const COMPUTE_INQUIRY_OPTIONS = {
  companyType: [
    opt("soe_central", "央企 / 国企", "Central / state-owned enterprise"),
    opt("soe_local", "地方国企 / 城投", "Local SOE / urban investment"),
    opt("listed_private", "上市民企", "Listed private company"),
    opt("unlisted_private", "非上市民企", "Unlisted private company"),
    opt("foreign_jv", "外资 / 合资", "Foreign / joint venture"),
    opt("research", "科研院校", "Research institute / university"),
    opt("other", "其他", "Other"),
  ],
  contactRole: [
    opt("decision_maker", "最终决策人", "Final decision maker"),
    opt("tech_lead", "技术负责人", "Technical lead"),
    opt("procurement", "采购执行人", "Procurement owner"),
    opt("referrer", "项目推荐人", "Referrer"),
  ],
  acquireMode: [
    opt("lease", "纯租赁（不买断）", "Lease only"),
    opt("lease_to_own", "租转买（先租后买）", "Lease-to-own"),
    opt("purchase", "直接购买", "Outright purchase"),
    opt("undecided", "未定，需建议", "Undecided — need a recommendation"),
  ],
  gpuModels: [
    opt("h200", "H200 HGX SXM5 141GB", "H200 HGX SXM5 141GB"),
    opt("h100", "H100 SXM5 80GB", "H100 SXM5 80GB"),
    opt("b200_b300", "B200 / B300 Blackwell", "B200 / B300 Blackwell"),
    opt("a100", "A100 80GB", "A100 80GB"),
    opt("rtx", "RTX 5090 / 4090", "RTX 5090 / 4090"),
    opt("domestic", "国产芯片（昆仑 / 昇腾）", "Domestic chips (Kunlun / Ascend)"),
    opt("any", "不限，按性价比推荐", "No preference — recommend on value"),
  ],
  network: [
    opt("ib400", "400G InfiniBand", "400G InfiniBand"),
    opt("ib200", "200G IB 可接受", "200G IB acceptable"),
    opt("nvlink", "NVLink / NVSwitch 互联", "NVLink / NVSwitch"),
    opt("ethernet", "以太网即可", "Ethernet is enough"),
    opt("none", "无特殊要求", "No special requirement"),
  ],
  storage: [
    opt("nvme", "本地 NVMe SSD", "Local NVMe SSD"),
    opt("shared", "大容量共享存储", "Large shared storage"),
    opt("s3", "对象存储（S3）", "Object storage (S3)"),
    opt("none", "无特殊要求", "No special requirement"),
  ],
  software: [
    opt("bare_metal", "裸金属（自行管 OS）", "Bare metal (we manage OS)"),
    opt("ubuntu", "需预装 Ubuntu", "Preinstalled Ubuntu"),
    opt("cuda", "需 CUDA / 驱动预装", "CUDA / drivers preinstalled"),
    opt("k8s", "需容器平台（K8s）", "Container platform (K8s)"),
    opt("other", "其他", "Other"),
  ],
  batchDelivery: [
    opt("yes_flex", "可以，有弹性窗口", "Yes, with a flexible window"),
    opt("no", "否，需一次到位", "No — must arrive in one batch"),
    opt("discuss", "可以商量", "Open to discussion"),
  ],
  location: [
    opt("north", "华北（北京 / 河北）", "North China (Beijing / Hebei)"),
    opt("east", "华东（上海 / 杭州）", "East China (Shanghai / Hangzhou)"),
    opt("southwest", "西南（成都 / 重庆）", "Southwest (Chengdu / Chongqing)"),
    opt("northwest", "青海 / 西北（低电价）", "Qinghai / Northwest (lower power cost)"),
    opt("any", "不限", "No preference"),
  ],
  usages: [
    opt("pretrain", "大模型训练（预训练）", "Foundation-model pretraining"),
    opt("finetune", "大模型微调（SFT/RLHF）", "Fine-tuning (SFT / RLHF)"),
    opt("inference", "推理部署（在线服务）", "Inference / online serving"),
    opt("hpc", "科学计算 / 仿真", "Scientific computing / simulation"),
    opt("media", "视频 / 图像生成", "Video / image generation"),
    opt("autonomy", "自动驾驶训练", "Autonomous-driving training"),
    opt("other", "其他", "Other"),
  ],
  loadPattern: [
    opt("always_on", "全天候高负载（7x24h）", "Always-on high load (24/7)"),
    opt("elastic", "弹性使用（按需）", "Elastic / on-demand"),
    opt("burst", "短期密集计算（爆发型）", "Short burst / peak load"),
  ],
  existingPlatform: [
    opt("new", "全新采购", "New procurement"),
    opt("expand", "扩容（已有基础设施）", "Expansion of existing infrastructure"),
    opt("replace", "替换现有供应商", "Replace current supplier"),
  ],
  contractTerm: [
    opt("lt1", "1 年以内", "Under 1 year"),
    opt("1to3", "1–3 年", "1–3 years"),
    opt("3to5", "3–5 年", "3–5 years"),
    opt("gt5", "5 年及以上", "5 years or more"),
    opt("flexible", "未定 / 灵活", "Undecided / flexible"),
  ],
  paymentStructure: [
    opt("deposit1_pay3", "押一付三（按季）", "1-month deposit, quarterly pay"),
    opt("deposit1_pay1", "押一付一（按月）", "1-month deposit, monthly pay"),
    opt("deposit3_pay1", "押三付一（按月）", "3-month deposit, monthly pay"),
    opt("deposit3_pay3", "押三付三（季付）", "3-month deposit, quarterly pay"),
    opt("annual", "年付（全年一次）", "Annual prepay"),
    opt("discuss", "需要商议", "Need to discuss"),
  ],
  budgetRange: [
    opt("lt100", "< 100 万 / 月", "< RMB 1M / month"),
    opt("100to500", "100–500 万 / 月", "RMB 1–5M / month"),
    opt("500to2000", "500–2000 万 / 月", "RMB 5–20M / month"),
    opt("gt2000", "> 2000 万 / 月", "> RMB 20M / month"),
    opt("tbd", "预算待定", "Budget TBD"),
  ],
  fundingSource: [
    opt("own", "自有资金", "Own funds"),
    opt("loan", "融资 / 银行贷款", "Financing / bank loan"),
    opt("gov", "政府专项资金", "Government special funds"),
    opt("downstream", "下游甲方预付款", "Downstream prepayment"),
    opt("equity", "股权融资 / 投资人", "Equity / investors"),
  ],
  invoice: [
    opt("vat_special", "增值税专用发票（可抵扣）", "VAT special invoice (deductible)"),
    opt("vat_normal", "普通发票", "Regular invoice"),
    opt("installment", "需分期开票", "Invoicing in installments"),
    opt("special", "有特定税务要求", "Specific tax requirements"),
  ],
  urgency: [
    opt("critical", "极紧迫（< 2 周）", "Critical (< 2 weeks)"),
    opt("urgent", "紧迫（1–2 个月）", "Urgent (1–2 months)"),
    opt("normal", "一般（2–6 个月）", "Normal (2–6 months)"),
    opt("relaxed", "不急（> 6 个月）", "Not urgent (> 6 months)"),
  ],
  acceptForward: [
    opt("yes_window", "可以，有明确等待窗口", "Yes, with a defined wait window"),
    opt("yes_flex", "可以，时间弹性大", "Yes, timing is flexible"),
    opt("spot_only", "否，只接受现货", "No — spot only"),
  ],
  hardDeadline: [
    opt("yes", "有硬性上线节点", "Yes, there is a hard go-live date"),
    opt("no", "无", "No"),
  ],
  phasedDelivery: [
    opt("yes", "可以", "Yes"),
    opt("no", "否，需一次到位", "No — must arrive in one batch"),
    opt("discuss", "可以商量", "Open to discussion"),
  ],
  compliance: [
    opt("mlps2", "等保二级以上", "MLPS Level 2 or above"),
    opt("no_export", "数据不出境要求", "Data must stay in China"),
    opt("gov_cloud", "政务云标准", "Government-cloud standard"),
    opt("finance", "金融行业合规", "Financial-industry compliance"),
    opt("none", "无特殊要求", "No special requirement"),
  ],
  supplierQual: [
    opt("soe", "国资 / 国企背景", "State-owned background"),
    opt("bank_guarantee", "需有银行保函能力", "Must be able to issue bank guarantees"),
    opt("onsite_ops", "需有驻场运维团队", "Need on-site operations team"),
    opt("idc", "正规 IDC 资质", "Licensed IDC"),
    opt("none", "无特殊要求", "No special requirement"),
  ],
} as const;

export type ComputeInquiryOptionKey = keyof typeof COMPUTE_INQUIRY_OPTIONS;

const ARRAY_FIELDS = Object.keys(COMPUTE_INQUIRY_OPTIONS) as ComputeInquiryOptionKey[];

const TEXT_LIMITS: Record<string, number> = {
  company: 160,
  creditCode: 40,
  registeredCapital: 40,
  revenueRange: 80,
  companyTypeOther: 80,
  businessDesc: 800,
  contactTitle: 80,
  contactPhone: 40,
  decisionMaker: 120,
  machineCount: 40,
  gpusPerMachine: 40,
  softwareOther: 120,
  usageOther: 120,
  projectBackground: 1200,
  contractingEntity: 160,
  invoiceNote: 200,
  earliestDate: 16,
  latestDate: 16,
  hardDeadlineDate: 16,
  extraNotes: 2000,
};

function asString(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function asStringList(value: unknown, allowed: readonly LabeledOption[], max = 12) {
  const raw = Array.isArray(value) ? value : typeof value === "string" && value ? [value] : [];
  const allow = new Set(allowed.map((item) => item.value));
  const out: string[] = [];
  for (const item of raw) {
    if (typeof item !== "string") continue;
    const key = item.trim();
    if (!allow.has(key) || out.includes(key)) continue;
    out.push(key);
    if (out.length >= max) break;
  }
  return out;
}

function labelOf(
  key: ComputeInquiryOptionKey,
  values: string[] | undefined,
  locale: "zh" | "en",
) {
  const options = COMPUTE_INQUIRY_OPTIONS[key];
  if (!values?.length) return "";
  return values
    .map((value) => {
      const found = options.find((item) => item.value === value);
      return found ? (locale === "en" ? found.en : found.zh) : value;
    })
    .join("、");
}

export function generateRfqId(now = new Date()) {
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");
  const n = Math.floor(Math.random() * 36 ** 4)
    .toString(36)
    .toUpperCase()
    .padStart(4, "0");
  return `GI-RFQ-${y}${m}${d}-${n}`;
}

export function parseComputeInquiry(input: unknown):
  | { ok: true; data: ComputeInquiry }
  | { ok: false; error: string } {
  if (!input || typeof input !== "object") {
    return { ok: false, error: "invalid_compute_inquiry" };
  }
  const body = input as Record<string, unknown>;

  const data: ComputeInquiry = {
    company: asString(body.company, TEXT_LIMITS.company),
    creditCode: asString(body.creditCode, TEXT_LIMITS.creditCode) || undefined,
    registeredCapital: asString(body.registeredCapital, TEXT_LIMITS.registeredCapital) || undefined,
    revenueRange: asString(body.revenueRange, TEXT_LIMITS.revenueRange) || undefined,
    companyType: asStringList(body.companyType, COMPUTE_INQUIRY_OPTIONS.companyType),
    companyTypeOther: asString(body.companyTypeOther, TEXT_LIMITS.companyTypeOther) || undefined,
    businessDesc: asString(body.businessDesc, TEXT_LIMITS.businessDesc) || undefined,
    contactTitle: asString(body.contactTitle, TEXT_LIMITS.contactTitle) || undefined,
    contactPhone: asString(body.contactPhone, TEXT_LIMITS.contactPhone),
    decisionMaker: asString(body.decisionMaker, TEXT_LIMITS.decisionMaker) || undefined,
    contactRole: asStringList(body.contactRole, COMPUTE_INQUIRY_OPTIONS.contactRole, 4),
    acquireMode: asStringList(body.acquireMode, COMPUTE_INQUIRY_OPTIONS.acquireMode, 4),
    gpuModels: asStringList(body.gpuModels, COMPUTE_INQUIRY_OPTIONS.gpuModels),
    machineCount: asString(body.machineCount, TEXT_LIMITS.machineCount),
    gpusPerMachine: asString(body.gpusPerMachine, TEXT_LIMITS.gpusPerMachine) || undefined,
    network: asStringList(body.network, COMPUTE_INQUIRY_OPTIONS.network),
    storage: asStringList(body.storage, COMPUTE_INQUIRY_OPTIONS.storage),
    software: asStringList(body.software, COMPUTE_INQUIRY_OPTIONS.software),
    softwareOther: asString(body.softwareOther, TEXT_LIMITS.softwareOther) || undefined,
    batchDelivery: asStringList(body.batchDelivery, COMPUTE_INQUIRY_OPTIONS.batchDelivery, 1),
    location: asStringList(body.location, COMPUTE_INQUIRY_OPTIONS.location),
    usages: asStringList(body.usages, COMPUTE_INQUIRY_OPTIONS.usages),
    usageOther: asString(body.usageOther, TEXT_LIMITS.usageOther) || undefined,
    loadPattern: asStringList(body.loadPattern, COMPUTE_INQUIRY_OPTIONS.loadPattern, 1),
    existingPlatform: asStringList(body.existingPlatform, COMPUTE_INQUIRY_OPTIONS.existingPlatform, 1),
    projectBackground: asString(body.projectBackground, TEXT_LIMITS.projectBackground) || undefined,
    contractTerm: asStringList(body.contractTerm, COMPUTE_INQUIRY_OPTIONS.contractTerm, 1),
    paymentStructure: asStringList(body.paymentStructure, COMPUTE_INQUIRY_OPTIONS.paymentStructure),
    budgetRange: asStringList(body.budgetRange, COMPUTE_INQUIRY_OPTIONS.budgetRange, 1),
    contractingEntity: asString(body.contractingEntity, TEXT_LIMITS.contractingEntity) || undefined,
    fundingSource: asStringList(body.fundingSource, COMPUTE_INQUIRY_OPTIONS.fundingSource),
    invoice: asStringList(body.invoice, COMPUTE_INQUIRY_OPTIONS.invoice),
    invoiceNote: asString(body.invoiceNote, TEXT_LIMITS.invoiceNote) || undefined,
    earliestDate: asString(body.earliestDate, TEXT_LIMITS.earliestDate),
    latestDate: asString(body.latestDate, TEXT_LIMITS.latestDate) || undefined,
    urgency: asStringList(body.urgency, COMPUTE_INQUIRY_OPTIONS.urgency, 1),
    acceptForward: asStringList(body.acceptForward, COMPUTE_INQUIRY_OPTIONS.acceptForward, 1),
    hardDeadline: asStringList(body.hardDeadline, COMPUTE_INQUIRY_OPTIONS.hardDeadline, 1),
    hardDeadlineDate: asString(body.hardDeadlineDate, TEXT_LIMITS.hardDeadlineDate) || undefined,
    phasedDelivery: asStringList(body.phasedDelivery, COMPUTE_INQUIRY_OPTIONS.phasedDelivery, 1),
    compliance: asStringList(body.compliance, COMPUTE_INQUIRY_OPTIONS.compliance),
    supplierQual: asStringList(body.supplierQual, COMPUTE_INQUIRY_OPTIONS.supplierQual),
    extraNotes: asString(body.extraNotes, TEXT_LIMITS.extraNotes) || undefined,
  };

  if (data.company.length < 2) return { ok: false, error: "invalid_company" };
  if (data.companyType.length < 1) return { ok: false, error: "invalid_company_type" };
  if (data.contactPhone.length < 6) return { ok: false, error: "invalid_phone" };
  if (data.contactRole.length < 1) return { ok: false, error: "invalid_contact_role" };
  if (data.acquireMode.length < 1) return { ok: false, error: "invalid_acquire_mode" };
  if (data.gpuModels.length < 1) return { ok: false, error: "invalid_gpu_models" };
  if (data.machineCount.length < 1) return { ok: false, error: "invalid_machine_count" };
  if (data.usages.length < 1) return { ok: false, error: "invalid_usages" };
  if (data.contractTerm.length < 1) return { ok: false, error: "invalid_contract_term" };
  if (!DATE_RE.test(data.earliestDate)) return { ok: false, error: "invalid_earliest_date" };
  if (data.latestDate && !DATE_RE.test(data.latestDate)) {
    return { ok: false, error: "invalid_latest_date" };
  }
  if (data.hardDeadlineDate && !DATE_RE.test(data.hardDeadlineDate)) {
    return { ok: false, error: "invalid_hard_deadline_date" };
  }

  return { ok: true, data };
}

type Line = { label: string; value: string };

function line(label: string, value?: string): Line | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  return { label, value: trimmed };
}

function renderLines(lines: Array<Line | null>) {
  return lines
    .filter((item): item is Line => Boolean(item))
    .map((item) => `**${item.label}：** ${item.value}`)
    .join("\n");
}

export function formatComputeInquirySections(inquiry: ComputeInquiry, locale: "zh" | "en") {
  const L = locale === "en" ? "en" : "zh";
  const pick = (key: ComputeInquiryOptionKey, values?: string[]) => labelOf(key, values, L);

  return [
    {
      title: "01 客户基本信息",
      body: renderLines([
        line("公司全称", inquiry.company),
        line("统一社会信用代码", inquiry.creditCode),
        line("注册资本（万元）", inquiry.registeredCapital),
        line("近年营收规模", inquiry.revenueRange),
        line("企业类型", pick("companyType", inquiry.companyType)),
        line("企业类型（其他）", inquiry.companyTypeOther),
        line("主营业务方向", inquiry.businessDesc),
        line("联系人职位", inquiry.contactTitle),
        line("联系方式（手机 / 微信）", inquiry.contactPhone),
        line("最终决策人", inquiry.decisionMaker),
        line("采购角色", pick("contactRole", inquiry.contactRole)),
      ]),
    },
    {
      title: "02 算力资源需求规格",
      body: renderLines([
        line("采购 / 租赁方式", pick("acquireMode", inquiry.acquireMode)),
        line("期望 GPU 型号", pick("gpuModels", inquiry.gpuModels)),
        line("需求台数", inquiry.machineCount),
        line("期望单台 GPU 卡数", inquiry.gpusPerMachine),
        line("计算网络要求", pick("network", inquiry.network)),
        line("存储需求", pick("storage", inquiry.storage)),
        line("系统与软件栈", pick("software", inquiry.software)),
        line("系统与软件（其他）", inquiry.softwareOther),
        line("可接受分批交付", pick("batchDelivery", inquiry.batchDelivery)),
        line("机房位置偏好", pick("location", inquiry.location)),
      ]),
    },
    {
      title: "03 使用场景与业务背景",
      body: renderLines([
        line("主要用途", pick("usages", inquiry.usages)),
        line("用途（其他）", inquiry.usageOther),
        line("算力负载特征", pick("loadPattern", inquiry.loadPattern)),
        line("是否有现有算力平台", pick("existingPlatform", inquiry.existingPlatform)),
        line("项目背景", inquiry.projectBackground),
      ]),
    },
    {
      title: "04 合同偏好与资金安排",
      body: renderLines([
        line("期望合同期限", pick("contractTerm", inquiry.contractTerm)),
        line("可接受付款结构", pick("paymentStructure", inquiry.paymentStructure)),
        line("月租总预算区间", pick("budgetRange", inquiry.budgetRange)),
        line("合同签署主体", inquiry.contractingEntity),
        line("资金来源", pick("fundingSource", inquiry.fundingSource)),
        line("发票要求", pick("invoice", inquiry.invoice)),
        line("发票备注", inquiry.invoiceNote),
      ]),
    },
    {
      title: "05 时间与交付要求",
      body: renderLines([
        line("期望最早使用时间", inquiry.earliestDate),
        line("最晚可接受交付时间", inquiry.latestDate),
        line("紧迫程度", pick("urgency", inquiry.urgency)),
        line("能否接受期货资源", pick("acceptForward", inquiry.acceptForward)),
        line("硬性上线节点", pick("hardDeadline", inquiry.hardDeadline)),
        line("硬性节点日期", inquiry.hardDeadlineDate),
        line("是否可以分批交付使用", pick("phasedDelivery", inquiry.phasedDelivery)),
      ]),
    },
    {
      title: "06 其他信息与特殊要求",
      body: renderLines([
        line("数据安全 / 合规要求", pick("compliance", inquiry.compliance)),
        line("期望供应商资质", pick("supplierQual", inquiry.supplierQual)),
        line("其他补充说明", inquiry.extraNotes),
      ]),
    },
  ].filter((section) => section.body);
}

export function formatComputeInquiryText(
  inquiry: ComputeInquiry,
  rfqId: string,
  locale: "zh" | "en",
) {
  const sections = formatComputeInquirySections(inquiry, locale);
  return [
    `编号: ${rfqId}`,
    "",
    ...sections.flatMap((section) => [section.title, section.body.replace(/\*\*/g, ""), ""]),
  ]
    .join("\n")
    .trim();
}

export const COMPUTE_OFFER_DEFAULTS: Record<
  string,
  {
    gpuModels: string[];
    location: string[];
    acquireMode: string[];
    contractTerm?: string[];
    acceptForward?: string[];
    paymentStructure?: string[];
  }
> = {
  rtx5090: {
    gpuModels: ["rtx"],
    location: ["east"],
    acquireMode: ["lease"],
    contractTerm: ["1to3"],
    acceptForward: ["spot_only"],
    paymentStructure: ["deposit1_pay3"],
  },
  "h200-chongqing": {
    gpuModels: ["h200"],
    location: ["southwest"],
    acquireMode: ["lease"],
    contractTerm: ["gt5"],
    acceptForward: ["yes_window"],
    paymentStructure: ["deposit1_pay3"],
  },
  "h200-hebei": {
    gpuModels: ["h200"],
    location: ["north"],
    acquireMode: ["lease"],
    contractTerm: ["3to5"],
    acceptForward: ["yes_window"],
    paymentStructure: ["deposit1_pay3"],
  },
  "b300-qinghai": {
    gpuModels: ["b200_b300"],
    location: ["northwest"],
    acquireMode: ["lease"],
    contractTerm: ["gt5"],
    acceptForward: ["yes_window"],
    paymentStructure: ["deposit3_pay1"],
  },
};

export function getComputeOfferDefaults(id?: string | null) {
  if (!id) return undefined;
  return COMPUTE_OFFER_DEFAULTS[id];
}

export function inquirySummaryMessage(inquiry: ComputeInquiry) {
  const bits = [
    inquiry.company,
    inquiry.gpuModels.join("/"),
    inquiry.machineCount ? `${inquiry.machineCount}台` : "",
    inquiry.earliestDate,
  ].filter(Boolean);
  return bits.join(" · ") || "算力采购需求";
}

/** Used only to keep TypeScript honest that catalogs stay complete. */
export function listInquiryOptionKeys() {
  return ARRAY_FIELDS;
}
