<style scoped lang="scss">

  .diagnostics-cont{
    .page-title{
      margin: 40px 0 20px 10px;
    }
    .page-body {
      box-shadow: 0px 4px 16px rgba(185, 185, 185, 0.25);
      padding: 30px 30px;
      min-height: 350px;
      .code-cont{
        text-align: justify;
        line-height: 1.45;
        background-color: #ffffff;
        padding: 0 16px;
        .copy-icon{
          top: 12px;
          right: 12px;
        }
        pre{
          code{
            color: #24292e;
            font-family: monospace,monospace!important;
            white-space: pre-line;
          }
        }
      }
    }
  }
</style>

<template>
	<div class="diagnostics-cont">
    <p class="page-title ft-blue-1 ft-size-20">ALUE Diagnostic dataset</p>
    <div class="page-body bg-neutral-white border-radius-6">
      <div class="code-cont border-radius-4 relative">
    <!-- <h1>ALUE Diagnostic dataset</h1> -->
        <h2>Introduction</h2>
        <p>NLU comprises a wide range of abilities that models should feature such as resolving syntactic and semantic ambiguity and high-level reasoning. </p>
        <p>NLU Models often show varying weaknesses depending on logical and linguistic phenomena. The use of manually annotated test set tagged with a wide range of fine-grained these phenomena helps NLU designers better understand their model’s generalization behavior and avoid overfitting. </p>
        <p>The Diagnostic test suite is part of the ALUE benchmark, it is a high-quality, hand-labeled NLI test set, inspired from the <a target="_blank" href="https://gluebenchmark.com/diagnostics">GLUE diagnostic test</a> suite in (Wang et al., 2018a) <a target="_blank" href="https://openreview.net/pdf?id=rJ4km2R5t7">paper</a>. It is intended for fine-grained evaluation of Arabic language understanding models through NLI. </p>
        <p>Download the diagnostics data with labels and tags from <a target="_blank" href="https://drive.google.com/file/d/1DOonofvdza9mBuVsboV7my8DGqbyU6Md/view">this link</a>. Also see section 4.1 from <a target="_blank" href="https://www.aclweb.org/anthology/2021.wanlp-1.18.pdf">ALUE paper</a> for a detailed description of the annotation process and ALUE website for a detailed description of linguistic classes covered by the test suite.</p>
        <br><h2>Contents</h2>
        <p>The ALUE diagnostic test suite is composed of about 1100 sentence pairs of a premise sentence and a hypothesis sentence labeled with their entailment relations (entailment, contradiction, or neutral), each sentence pair is also annotated with one or more classes representing the linguistic phenomena involved in justifying the entailment labels.<br /></p>

         <el-table v-bind:data="tableData" >
            <el-table-column prop="tags" label="Tags"></el-table-column> 
            <el-table-column prop="premise" label="Premise" ></el-table-column>
            <el-table-column prop="hypothesis" label="Hypothesis" ></el-table-column>
            <el-table-column prop="label" label="Label" ></el-table-column>
         </el-table>
         
        <p />
        <p>Tags are further divided into 4 coarse-grained classes which are also divided into 36 fine-grained categories. Each sentence pair is tagged by one or more of these classes giving about 150 descriptions.</p>
        <p />
        <br><h2>Classes </h2>
        <p> The class distribution is represented as the following :</p>
        
        <el-table v-bind:data="classesData" >
            <el-table-column prop="Coarse_Grained" label="Coarse-Grained"></el-table-column> 
            <el-table-column prop="Fine_Grained" label="Fine-Grained" ></el-table-column>
         </el-table>

        <p />
        <br><h2>Text sources<br /></h2>
        <ol>
          <li>
              <p>MultiUN: The United Nations Parallel Corpus v1.0 is composed of official records and other parliamentary documents of the United Nations that are in the public domain.</p>
          </li>
          <li>
              <p>Wikipedia: a free online encyclopedia</p>
          </li>
          <li>
              <p>ALP: A collection syntactically annotated texts of various genres as news items, prose, literature, dialogues, and TV podcasts to ensure high representativeness of spoken and written Arabic. </p>
          </li>
 
          <li>
              <p>Manual translation: 321 manually translated sentence pairs from the GLUE test set, these were artificially created and mostly express complex linguistic phenomena.</p>
          </li>
        </ol>
        <br><h2>File format</h2>
        <p>The diagnostic test set uses the same file format of GLUE. The data is distributed in .tsv format with the following columns:</p>
        <ol>
          <li>
              <p>Lexical Semantics:  fine-grained linguistic categories related to word semantics</p>
          </li>
          <li>
              <p>Predicate-Argument Structure:  fine-grained linguistic categories related to syntax </p>
          </li>
          <li>
              <p>Logic: fine-grained linguistic categories related to logical operators: Negation, conjunction</p>
          </li>
          <li>
              <p>Knowledge: fine-grained categories related to extra-linguistic knowledge </p>
          </li>
          <li>
              <p>Domain: represents the text source of the premise (see text sources)</p>
          </li>
          <li>
              <p>Premise: the sentence extracted from the corpus exhibiting some linguistic phenomena</p>
          </li>
          <li>
              <p>Hypothesis: the sentence obtained from the premise deriving a presupposition that can be judged in terms of entailment.</p>
          </li>
          <li>
              <p>Label: NLI entailment label (entailment, contradiction, neutral)<br /></p>
          </li>
        </ol>
        <br><h2>Usage</h2>
        <p>As a benchmark, the diagnostic test suite should be used to evaluate and populate the results of models trained on Cross-lingual Natural Language Inference (XNLI) for each of the classes in the test suite.</p>
        <p>The XLNI corpus is a crowd-sourced collection of 5,000 test and 2,500 dev pairs from the MultiNLI corpus. The pairs are annotated with textual entailment and are translated into 14 languages including Arabic.</p>
        <p>The ALUE diagnostic test set has been made to reflect the schema and classes of GLUE. The latter is labeled closely to MultiNLI dataset. As both Arabic XNLI and ALUE diagnostic datasets were derived from GLUE and MultiNLI, we hope it covers a large number of the cases in the training set. Nevertheless, the performance on the diagnostic set is not intended to reflect the overall performance on the dev-test.</p>
        <p>The test suit is intended to enable NLU model designers to evaluate their model's strengths and weaknesses to help further investigate other methods and optimizations.</p>
        <p><br /></p>
        <h2>Linguistic Categorization</h2>
        <h3>1. Lexical semantics</h3>
        <h3 style="margin-left: 30.0px;">1.1. Lexical entailment:</h3>
        <div style="margin-left: 30.0px;">
          <p >Linguistic entailments occur when one may draw necessary conclusions from a particular use of a word, phrase or sentence. Entailment phrases are relations between propositions and are always worded as, &quot;if A then B,&quot; meaning that if A is true, then B must also be true giving an entailment or &quot;if A then not B,&quot; giving a contradiction. Lexical entailment is mostly described in term of semantic relations as synonymy, opposition, situational implication, type of/subtype of</p>
          <ul>
            <li>
                <p>الماء بارد <em>the water is cold</em> <strong>contradicts</strong> الماء حار<em> the water is hot</em>. </p>
            </li>
            <li>
                <p>إنه يشخر <em>he is snoring </em><strong>entails but isn’t necessarily entailed by</strong> أنه نائم <em>he is sleeping</em>. </p>
            </li>
          </ul>
          <p>Hypernymy and hyponymy hinges with upward monotonicity :</p>
          <ul>
            <li>
                <p>تعتمد الكثير من اللغات على الأبجدية العربية في الكتاب <em>many languages ​​rely on the Arabic alphabet for writing</em> <strong>entails but is not entailed by</strong> تعتمد الكثير من اللغات على الأبجدية في الكتابة<em> many languages ​​rely on the alphabet for writing</em>.</p>
            </li>
          </ul>
          <p />
          <h3>1.2. Morphological Negation</h3>
          <p>This linguistic category is used rarely used in Arabic where a noun or an adjective word is prefixed with the negation particle la. We choose to distinguish them from other negation particles where the negation particle constitutes a whole word rather than of morphological order.</p>
          <p>الأعداد لامتناهية <em>numbers are infinite</em> <strong>contradicts with</strong> الأعداد متناهية<em> numbers are finite</em>.</p>
          <p>We considered other constructions as لا متناهية where the negation particle is not prefixed as Negation.</p>
          <p />
          <h3 >1.3. Symmetry/Collectivity</h3>
          <p>This case describes invariant entailments when transforming propositions with symmetric relations where the different arguments can be reordered into a new proposition.</p>
          <p>This category concerns mostly verbs and nouns denoting symmetrical relations as <em>meet, agree</em>.</p>
          <ul>
            <li>
                <p>تزوج رجل الأعمال المصري أحمد أبوهشيمة من الفنانة هيفاء وهبي <em>Egyptian businessman Ahmed Abu Hashima married Haifa Wehbe</em> <strong>entails and is entailed by </strong>تزوجت الفنانة هيفاء وهبي من رجل الأعمال المصري أحمد أبوهشيمة <strong>Haifa Wehbe married the Egyptian businessman Ahmed Abu Hashima</strong>.</p>
            </li>
          </ul>
          <p>We also choose to classify Reciprocity under this category, Arabic marks this relation by marking verb morphologically with a reciprocity morpheme and grouping arguments into the subject with a conjunction connector. </p>
          <ul>
            <li>
                <p>تقاتل الزواحف بعضها بوساطة العض والهرش <em>Reptiles fight each other by biting and scratching</em> <strong>entails and is entailed by</strong> تتقاتل الزواحف بوساطة العض والهرش <em>Reptiles fight (each other) by biting and scratching</em>.</p>
            </li>
          </ul>
          <p />
          <h3 >1.4. Redundancy</h3>
          <p>Describes cases where the removal of a word in a sentence doesn’t change it’s meaning, Identifying these cases reflects understanding lexical and discourse meaning</p>
          <ul>
            <li>
                <p>كانت عائلة تولستوي من العائلات المعروفة من بين النبلاء الروس القدامى <em>the Tolstoy family was one of the well-known families among the ancient Russian nobility</em><strong> entails and is entailed by</strong> كانت عائلة تولستوي معروفة بين النبلاء الروس القدامى <strong>the Tolstoy family was known among the ancient Russian nobility</strong>.</p>
            </li>
          </ul>
          
          <h3 >1.5. Named entities</h3>
          <p>A named entity is a real-world object, such as persons, locations, organizations, products, etc., that can be denoted with a proper name. Both &quot;Trump&quot; and the &quot;United States&quot; are named entities since they refer to specific objects (Donald Trump and the United States). However, &quot;president&quot; is not a named entity since it can be used to refer to many different objects in different worlds. </p>
          <p>Identifying named entities permits Entity linking/disambiguation and acronym expansions.</p>
          <ul>
            <li>
                <p> إن وفد جمهورية مقدوينا ينوى تقديم مشروع قرار بشأن تطبيق المادة ٥٠ من الميثاق <em>the delegation of the Republic of Macedonia intends to submit a draft resolution on the application of Article 50 of the Charter</em> <strong>entails and is entailed by</strong> إن وفد مقدوينا ينوى تقديم مشروع قرار بشأن تطبيق المادة ٥٠ من الميثاق <em>the delegation of Macedonia intends to submit a draft resolution on the application of Article 50 of the Charter</em>.</p>
            </li>
          </ul>
          <p />
          <h3>1.6. Quantifiers </h3>
          <p>Here quantifiers are considered as quantity indicators rather than interpreted as &quot;given any&quot; or &quot;for all&quot; (see Quantification). Change in quantity can imply changes in truth conditions of entailments :</p>
          <ul>
            <li>
                <p>إن بعض الاصلاحات التي اضطلعت بها قد أحرزت تقدما بالغا <em>some of the reforms it has undertaken have made significant progress</em> <strong>doesn’t entail but entailed by</strong> إن كل الاصلاحات التي اضطلعت بها قد أحرزت تقدما بالغا <em>all of the reforms it has undertaken have made significant progress</em>.</p>
            </li>
          </ul>
          <p />
        </div>
        <br><h3>2. Predicate-Argument Structure</h3>
        
          <p>A predicate and its arguments form a predicate-argument structure. the predicate holds a fixed number of arguments and optional adjuncts that helps complete it’s meaning. Arguments can have satellite elements that change their reference. The fine-grain sub-categories describe phenomena on the addition, deletion, or edit of these arguments and their satellites.</p>
          <p />
          <div style="margin-left: 30.0px;">
          <h3>2.1. Relative clauses</h3>
          <p>Typically, a relative clause modifies a noun or noun phrase and uses some grammatical device to indicate that one of the arguments within the relative clause has the same referent as that noun or noun phrase. The property described by a relative clause restricts its noun reference thus changing the entailment of the sentence:</p>
          <ul>
            <li>
                <p>لا أريد التعامل مع الناس<em> I do not want to deal with people</em> <strong>entails but not entailed by </strong>لا أريد التعامل مع الناس الذين لا يقدرون وقتي <em>I do not want to deal with people who do not appreciate my time</em>.<br /></p>
            </li>
          </ul>
          <h3>2.2. Prepositional Phrase</h3>
          <p>Describe arguments and adjuncts that are introduced by a preposition. The addition, replacement or removal change of these can entail a change of the meaning of the predicate. Identification of prepositional phrases dependency to the predicate is a first step to resolving language ambiguity.</p>
          <ul>
            <li>
                <p>تشير الأبحاث إلى أن السيطرة على مرض السكري مبكرا يمكن أن يكون لها مكاسب كبيرة في السنوات اللاحقة <em>research suggests that controlling diabetes early on can have big gains in subsequent years</em><strong> doesn’t entail</strong> في السنوات اللاحقة تشير الأبحاث إلى أن السيطرة على مرض السكري مبكرا يمكن أن يكون لها مكاسب كبيرة <em>in subsequent years, research indicates that controlling diabetes early can have major benefits</em>.</p>
            </li>
          </ul>
          <h3>2.3. Alternations</h3>
          <p>Alternations are described in terms of change of verb arguments, here, we consider all types of syntactic alternation, verbal and nominal.</p>
          <p>Change of core arguments affects the argument realization without any impact on the meaning. Several types of alternations exist in Arabic :<br /></p>
          <p><strong>Causative/Inchoative</strong></p>
          <ul>
            <li>
                <p>كسر سعيد المزهرية <em>Saeed broke the vase</em> <strong>entails and is entailed by </strong>انكسرت المزهرية <em>The vase broke</em>.</p>
            </li>
          </ul>
          <p><strong>Active/Passive</strong></p>
          <ul>
            <li>
                <p>كسر سعيد الشباك <em>Saeed broke the window</em> <strong>entails but is entailed by</strong> كسر الشباك <em>the window was broken.</em></p>
            </li>
          </ul>
          <p><strong>Nominalization</strong></p>
          <ul>
            <li>
                <p><em>أعدم الجيش الألماني أكثر من 6,500 شخص من المدنيين الفرنسيين والبلجيكيين the German army executed more than 6,500 people, French and Belgian civilians </em><strong>entails and is entailed by</strong> قام الجيش الألماني بأعدام أكثر من 6,500 شخص من المدنيين الفرنسيين والبلجيكيين <em>the German army did the execution more than 6,500 people, French and Belgian civilians.*</em></p>
            </li>
          </ul>
          <p><strong>Datives</strong></p>
          <ul>
            <li>
                <p>أهدى جاك فيلبي بعض عينات من الطيور للمتحف البريطاني <em>Jack Philby gave some bird samples to the British Museum </em><strong>entails and is entailed by</strong> أهدى جاك فيلبي المتحف البريطاني بعض عينات من الطيور <em>Jack Philby gave the British Museum some bird samples.</em></p>
            </li>
          </ul>
          <p><strong>Topicalization</strong></p>
          <p>This is a discourse alternation where a specific argument or adjunct is preposed to the sentence for emphasis</p>
          <ul>
            <li>
                <p><em>رأينا بنت نادية في المسرح we saw Nadia's daughter in the theater </em><strong>entails and is entailed by</strong><em> بنت نادية رأيناها في المسرح Nadia's daughter, we saw her in the theater.</em></p>
            </li>
          </ul>
          <p />
          <h3 >2.4. Anaphora/Coreference</h3>
          <p>To derive the correct interpretation of a text, pronouns and other referring expressions must be connected to the right individuals. Coreference describes situations where multiple expressions refer to the same entity (has the same reference). Anaphora refers strictly speaking to situations where an expression refers to another linguistically. While the entity to which refers an Anaphora is not always present in fragments of text, and coreference reference is not always mentioned, these two notions overlap. We include only situations where referents are mentioned in context.</p>
          <p>Different syntactic models suffer from inherent ambiguity in texts, treating this category with both syntactic and semantic levels helps binding these expressions to some extent. We include examples where the reference of an anaphora is changed in context to refer to different items, if the anaphora is bouned to right referent the first sentence entails the other, otherwise, the entailment relation is a contradiction.</p>
          <p />
          <h3 >2.5. Intersectivity</h3>
          <p>Intersectivity is used with a modifier that when modifying a noun, results in a noun of the same class. For example, a red book is still a book, a beautiful dancer is still a dancer. However, a fake tree is not a tree, and an alleged criminal may not be a criminal.</p>
          <p>In general given a modifier A and an entity N, if A+N is an N, then A is intersective. Thus, these modifiers are not necessary in order to identify the entity it modifies. In contrast to restrictivity (see below), the deletion of the modifier doesn’t produce changes in entailment but the addition of a new property produces a neutral entailment.</p>
          <ul>
            <li>
                <p>لقد أصبحت لاعب بوكر محترف <em>I became a professional poker player</em> <strong>doesn’t entail</strong> أصبحت محترفا <em>I became a professional.</em></p>
            </li>
          </ul>
          <p>Some modifiers, mainly non-intersective adjectives like <em>fake</em> in <em>a fake dollar bill</em>, also called non-subsective, output a meaning with an empty intersection with the meaning of the original noun but shares real properties with it (e.g., [real] dollar bills). This category also affects the Factivity entailment of the sentence.</p>
          <p>This category describes two different properties shared by the same entity producing a new object that lies in each of the original objects.</p>
          <p>Intersectivity is almost produced by non-restrictive modifiers as adjectives and relatives that add additional properties to the entity.</p>
          <p />
          <h3 >2.6. Restrictivity</h3>
          <p>Restricitivitiy describes situations when modifiers are necessary in order to identify a subset of entities. The use of these modifiers narrows down the set of entities to a smaller set. Deletion or addition of such modifiers changes the referent of the sentence, thus changing it’s meaning.</p>
          <p>وقام عدد قياسي بلغ 181 ألفا بهذه الرحلة العام الماضي معظمهم في قوارب متداعية يديرها مهربو البشر <em>A record number of 181,000 made the trip last year, mostly on dilapidated boats run by human traffickers</em> entails<em> </em>وقام عدد قياسي بلغ 181 ألفا بهذه الرحلة العام الماضي معظمهم في قوارب يديرها مهربو البشر <em>A record number of 181,000 made the trip last year, mostly on boats run by human traffickers.</em></p>
          <p>Nonrestrictive modifiers cannot narrow down the set of entities to a smaller set</p>
          <p>تصاعدت موجة غضب كتلة الإصلاح المحسوبة على جماعة الإخوان المسلمين تجاه التصريحات <em>the wave of anger of the Islah bloc, which is affiliated with the Muslim Brotherhood, escalated towards the statements </em>entails تصاعدت موجة غضب كتلة الإصلاح تجاه التصريحات <em>the mass of anger of the Reformation escalated towards the statements.</em></p>
          <p>Modifiers that are commonly used restrictivity are restrictive adjectives, relative clauses introduced by التي, الذي. In some cases these relative particles are omitted from sentences yielding ambiguity in the hypothesis’s predicate arguments.</p>
          <ul>
            <li>
                <p>إن الحملة التي قادها البعض من داخل البرلمان لا تصب أبدا في الصالح العام <em>the campaign that some have led from within Parliament is never in the public interest </em>VS إن الحملة التي قادها البعض لا تصب أبدا في الصالح العام <em>the campaign that some have led from within Parliament is never in the public interest.</em></p>
            </li>
          </ul>
          <p />
        </div>
        <h3>3. Logic</h3>
        <p>Sentence pairs are also described by logical operators :</p>
        <div style="margin-left: 30.0px;">
          <h3 ><strong>3.1. Negation </strong></h3>
          <p />
          <ul>
            <li>
                <p>الخفافيش هي ليست مصدر الفيروس الأساسي <em>bats are not the primary source of the virus</em> <strong>contradicts with</strong> الخفافيش هي مصدر الفيروس الأساسي <em>bats are the primary source of the virus.</em></p>
            </li>
          </ul>
          <p />
          <h3 ><strong>3.2. Double negation</strong></h3>
          <ul>
            <li>
                <p>إن الحالة الاقتصادية العالمية ما زالت غير مستقرة <em>the world economic situation remains unstable </em><strong>contradicts with</strong> إن الحالة الاقتصادية العالمية ليست غير مستقرة <em>the world economic situation is not precarious.</em></p>
            </li>
          </ul>
          <p />
          <h3 ><strong>3.3. Conjunction</strong></h3>
          <ul>
            <li>
                <p>المشروع ما زال يحتاج إلى أبحاث إضافية ويستدعى وقتا أطول <em>the project still needs additional research and takes a long time</em> <strong>entails but is not entailed by</strong> المشروع ما زال يحتاج إلى أبحاث إضافية <em>the project still needs additional research.</em></p>
            </li>
          </ul>
          <p />
          <h3 ><strong>3.4. Disjunction </strong></h3>
          <ul>
            <li>
                <p>إما لديه ثقة عمياء أو لديه تضارب في المصالح e<em>ither he has blind confidence or a conflict of interest </em><strong>doesn’t entail</strong> لديه تضارب في المصالح <em>he has a conflict of interest.</em></p>
            </li>
          </ul>
          <p />
          <h3 ><strong>3.5. Conditionals</strong></h3>
          <ul>
            <li>
                <p>وقالوا له إذا مر بك الحارث فأنشده بيت الشعر هذا <em>And they said to him, &quot;If Al-Harith passed you, you would sing this verse.&quot; </em><strong>doesn’t entail</strong> وقالوا له فأنشد للحارث بيت الشعر هذا <em>And they said to him, Then he sang to the harder this verse.</em></p>
            </li>
          </ul>
          <p />
          <h3 >3.6. Monotonicity</h3>
          <p>Many natural language statements are actually predicates over some entities that may be sets of elements. The use of generalized quantifiers as <code>all</code>, <code>some</code>, <code>no</code>, <code>most</code>, <code>many with these entities express relations between sets. </code>Changes on the <em>restrictor (</em>elements quantified by the quantifier ) establish entailment relations in the following manners:</p>
          <p><strong>Upward entailment</strong> means that if a relation holds for some set X, then the relation will hold for a superset of X.</p>
          <ul>
            <li>
                <p>تعتمد الكثير من اللغات على الأبجدية العربية في الكتابة <em>Many languages ​​rely on the Arabic alphabet for writing </em><strong>entails but is not entailed by</strong> تعتمد الكثير من اللغات على الأبجدية في الكتابة <em>Many languages ​​rely on the alphabet for writing.</em></p>
            </li>
          </ul>
          <p><strong>Downward entailment</strong> means that if a relation holds for some X, then the relation will hold for a subset of X.</p>
          <ul>
            <li>
                <p>وتعد دينامية العديد من البلدان النامية في جنوب شرق آسيا استثناء واضحا في هذا المجال <em>The dynamicity of many developing countries in Southeast Asia is a clear exception in this area</em> <strong>doesn’t entail but is entailed by </strong>وتعد دينامية العديد من البلدان في جنوب شرق آسيا استثناء واضحا في هذا المجال <em>the dynamicity of many countries in Southeast Asia is a clear exception in this area</em>.</p>
            </li>
          </ul>
          <p><strong>Non-Monotone </strong>if it is neither monotone increasing nor monotone decreasing.</p>
          <ul>
            <li>
                <p>كان كلوفيس الأول أول ملك للفرنكيين يوحد جميع القبائل تحت حاكم واحد. <em>Clovis I was the first king of the Franks to unite all tribes under one ruler</em> <strong>doesn’t entail and isn’t entailed by</strong> كان كلوفيس الأول أول ملك يوحد جميع القبائل تحت حاكم واحد. <em>Clovis I was the first king to unite all tribes under one ruler.</em></p>
            </li>
          </ul>
          <p />
          <p />
        </div>
        <br/>
        <h3>4. Quantification</h3>
        <p>Here, we consider Universal and Existential quantification interpreted as &quot;given any&quot; or &quot;for all&quot;. It asserts that a predicate within the scope of a universal quantifier is true of every value of a predicate variable rather than a change of a quantity (see quantifiers).</p>
        <p><strong>Universal</strong> </p>
        <ul>
          <li>
              <p> يحتوي <strong>كل</strong> عنصر كيميائي على عدد ذري فريد <em>every chemical element holds a unique atomic number</em> <strong>entails, but is not entailed by</strong>يحتوي<strong> هذا</strong> العنصر الكيميائي على عدد ذري فريد <em>this chemical element holds a unique atomic number</em>.</p>
          </li>
        </ul>
        <p><strong>Existential</strong></p>
        <ul>
          <li>
              <p> <strong>تحتوي</strong> <strong>بعض</strong> خوذ الدراجات النارية على نظام عاكس بصري متعدد <em>Some motorcycle helmets have a multi-reflective optical system </em><strong>does not entail but is entailed by تحتوي</strong> خوذة دراجاتي النارية على نظام عاكس بصري متعدد <em>Some motorcycle helmets have a multi-optical reflector system.</em></p>
          </li>
        </ul>
        <p />
        </br>
        <h3>5. Knowledge &amp; Common Sense</h3>
        <p>Situations where inference requires extra-linguistic knowledge. This category is further divided into two types :</p>
        <p><strong>World Knowledge</strong></p>
        <p>knowledge that can be represented and learned as facts.</p>
        <ul>
          <li>
              <p>درجة حرارة الماء 100 درجة مؤية <em>water boils at 100 degrees Celsius</em> <strong>entails</strong> الماء يغلي.</p>
          </li>
          <li>
              <p>ذهبت الى نيويورك <em>I went to new york</em> entails ذهبت الى الولايات المتحدة I went to the United States.</p>
          </li>
        </ul>
        <p><strong>Common Sense</strong></p>
        <p>In this category, logical inference depends on people’s basic ability to perceive, understand, and judge that is shared by (&quot;common to&quot;) nearly all people.</p>
        <ul>
          <li>
              <p>تزوج رجل الأعمال المصري أحمد أبوهشيمة من الفنانة هيفاء وهبي وعاش معها لمدة سنة <em>Egyptian businessman Ahmed Abu Hashima married Haifa Wehbe and lived with her for a year</em> <strong>entails and is entailed by</strong> دام زواج رجل الأعمال المصري أحمد أبوهشيمة من الفنانة هيفاء وهبي لمدة سنة <em>The marriage of Egyptian businessman Ahmed Abu Hashima to Haifa Wehbe lasted for a year</em></p>
          </li>
          <li>
              <p>إن الجهود التي تبذلها البلدان النامية ﻹنعاش اقتصادها لن تحقق أهدافها طالما ظل النظام الاقتصادي <em>The efforts of developing countries to revitalize their economies will not achieve their goals as long as the economic system remains </em><strong>entails and is entailed by</strong> لن تستطيع البلدان النامية إنعاش اقتصادها طالما ظل النظام الاقتصادي <em>Developing countries will not be able to revive their economy as long as the economic system remains.</em></p>
          </li>
        </ul>
        <p>Common sense concerns situations where people use extra-linguistic knowledge to make judgments that sound enough likely to be true. This knowledge is experienced through the senses or social interaction is considered to be shared by most people.</p>
        <p />
        <p />
        <p />
      </div></div>
	</div>
</template>

<script>
  import Vue from "vue";

  export default {
    name: "diagnostics",
    mounted() {
      
    },
    data() {
    	return {
        tableData: [{
          tags: "Intersectivity",
          premise: "لقد أصبحت لاعب بوكر محترف I became a professional poker player",
          hypothesis: "لقد أصبحت لاعب بوكر I became a poker player",
          label: "entailment"
        },
        {
          tags: "Intersectivity",
          premise: "لقد أصبحت لاعب بوكر I became a poker player",
          hypothesis: "لقد أصبحت لاعب بوكر محترف I became a professional poker player",
          label: "neutral"
        },
        {
          tags: "Symmetry/Collectivity;Core args;Conjunction",
          premise: "التقى سمير غانم بكل من جورج سيدهم و الضيف أحمد Samir Ghanem met with George Sidho and Ahmed Aldeif",
          hypothesis: "التقى جورج سيده بسمير غانم George Sidhoh met Samir Ghanem",
          label: "entailment"
        },
        {
          tags: "Symmetry/Collectivity; Core args; Conjunction",
          premise: "التقى جورج سيده بسمير غانم George Sidhoh met Samir Ghanem",
          hypothesis: "التقى سمير غانم بكل من جورج سيدهم و الضيف أحمد Samir Ghanem met with George Sidhoh and Ahmed Aldeif",
          label: "neutral"
        },
        ],
        classesData: [{
          Coarse_Grained: "Lexical Semantics",
          Fine_Grained: "Factivity, Lexical entailment, Morphological negation, Named entities, Quantifiers, Redundancy, Symmetry/Collectivity"
        },
        {
          Coarse_Grained: "Predicate-Argument Structure",
          Fine_Grained: "Active/Passive, Adjectivation, Affixation, Anaphora/Coreference, Coordination scope, Core args, Datives, Ellipsis/Implicits, Genitives/Partitives, Intersectivity, Nominalization, Prepositional phrases, Relative clauses, Restrictivity, Topicalization."
        },
        {
          Coarse_Grained: "Logic",
          Fine_Grained: "Conditionals, Conjunction, Disjunction, Double negation, Downward monotone, Non-monotone,  Upward monotone, Existential, Intervals/Numbers, Negation, Temporal, Universal."
        },
        {
          Coarse_Grained: "Knowledge",
          Fine_Grained: "World knowledge, Common sense."
        },
        ]
    	};
    },
    methods: {

    }
  };
</script>
