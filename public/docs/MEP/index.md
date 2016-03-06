# Microenvironment Perturbagen (MEP) LINCS Center

* Project Title: [Extrinsic Perturbations of Cell Physiology and Associated Regulatory Networks (1U54HG008100)](http://projectreporter.nih.gov/project_description.cfm?projectnumber=1U54HG008100-01)
* Principal Investigators: [Joe Gray PhD](http://www.ohsu.edu/xd/education/schools/school-of-medicine/departments/basic-science-departments/biomedical-engineering/people/joe-gray.cfm), [Laura Heiser PhD](http://www.ohsu.edu/xd/education/schools/school-of-medicine/departments/basic-science-departments/biomedical-engineering/people/laura-heiser.cfm), [James Korkola PhD](http://www.ohsu.edu/xd/education/schools/school-of-medicine/departments/basic-science-departments/biomedical-engineering/people/james-korkola.cfm)
* Awardee Institution: [Oregon Health and Science University](http://www.ohsu.edu/xd/)

Our goal in this project is to contribute to further development of the NIH Library of Integrated Network-based cellular signatures (LINCS) program by developing a dataset and computational strategy to elucidate how microenvironment (ME) signals affect cell intrinsic intracellular transcriptional- and protein-defined molecular networks to generate experimentally observable cellular phenotypes. We will infer these regulatory relationships by combining measurements of ME perturbagen-induced changes in multiple cellular phenotypes, RNA expression and regulatory protein expression in a core set of cell lines with measurements of responses of the same lines to chemical and genomic perturbagens made by our team in other projects and by other LINCS sites. Our data will complement existing perturbagen response LINCS data by providing information on ME perturbagen-induced changes and by providing quantitative image based measurements of seven cellular response phenotypes plus associated changes in gene transcription and regulatory protein expression. Integrative analysis of these data will enable us to address four key questions:

1. How are ME peturbagen-induced cellular phenotypes regulated by specific molecular networks?
2. Do subsets of ME-induced perturbations elicit common molecular network changes and phenotypic responses?
3. Do specific molecular network signatures influence multiple cellular phenotypes?
4. Are the ME perturbagen-induced network changes similar to the genetic or chemically induced network changes identified in other LINCS projects?

# Overview

## Data Generated (Plan)

Our MEP-LINCS center will use a graduating workflow to assess the functional impact of microenvironmental perturbations on cells. Each year, 3-4 new cell lines will undergo high-throughput MEMA profiling at OHSU and LBNL, which will lead to refinement of the MEPs nominated for molecular profiling. The datasets we plan to generate in the early phase of this project (Sept 2014 – Dec 2015) are detailed in the accompanying excel spreadsheet. Data will be released through the MEP-LINCS Synapse wiki hosted at Sage Bionetworks, and also made available to the DCIC.

Our workflow is as follows:

1. High-throughput MEMA at OHSU to select 50 MEPs for follow-up studies at LBNL
2. Low-throughput MEMA at LBNL to validate and identify 30 MEPs for molecular profiling studies
3. RPPA and transcriptional profiling of all 20 cancer cell lines following treatment with 30 validated MEPs

<img src="docs/MEP/img/fig2.png" width="100%">
## Description of each unique study

The biological behaviors of normal and diseased cells and their responses to therapeutic agents are strongly influenced by the regulatory signals they receive from the microenvironments (ME) in which they reside. These signals come from direct interactions with insoluble extracellular matrix and cellular proteins as well as soluble proteins, peptides, or glycoproteins. The behavior of cells receiving these signals ultimately is determined by the interaction of multiple signals received with the regulatory networks intrinsic to the target cell. However, the mechanisms by which combinatorial ME signals influence intrinsic regulatory networks and the cellular phenotypes they control are not well established. We posit that these can be inferred from measurements of cellular and molecular responses to growth on a wide range of soluble and insoluble substrates. 

The MEP-LINCS will use a novel microenvironment microarray (MEMA) based platform to assess the impacts of ~3000 different pairwise combinations of ME perturbagens (MEPs) on specific biological and molecular endpoints. We will use high content fluorescence imaging to assess 10 biological response endpoints of cells grown on MEMAs, including: proliferation, differentiation status, DNA damage, and senescence. Over the course of the grant, we will do this for 20 well-characterized cell lines representing normal and diseased tissues, 5 of which will be studied by other LINCS centers.  Each year, we will select 50 “high impact” ME perturbagens for further analysis and validation.  We will print the 50 high impact ME perturbagens on two substrates that differ in stiffness and measure changes in cellular phenotypes using high resolution imaging. The 50 high impact ME perturbagens will be further prioritized, and 30 will be nominated for molecular profiling studies. In years 2-6, the 20 cell lines will be treated with 30 ME perturbagens followed by assessment of protein levels using reverse phase protein arrays (RPPA) and transcription levels for the 1000 Landmark Genes defined by the Broad-LINCS using their L1000 Luminex platform.


Associations between quantitative response phenotype features extracted from multi-color cell images, as well as RNA and protein profiles, will be established using both statistical and pathway mapping algorithms. This complement of signatures will provide an integrated understanding of the cellular phenotypes and regulatory networks affected by ME perturbagens. Once identified, we will use both supervised and unsupervised analysis approaches to identify regulatory networks common to subsets of the ME or phenotypic molecular signatures. Our expectation is that some subnetworks will be relatively universal for mediating response to ME perturbations, while others will be specific to subsets of them.

<img src="docs/MEP/img/fig1.png" width="100%">
## QA/QC

### Cell line identity

We will follow the LINCS “Best Practices” plan for tracking cell line identity. In particular, we will use the BROAD genotyping assay to assess 96 SNPs that can be used to confirm the identity of every cell line we are using in our MEP-LINCS study. Cell lines will be genotyped prior to generation of LINCS data, and periodically throughout the grant term. Should the genotyping assay ever reveal a mis-match in our cell line, we will revert to a parent stock.

### Image quality

For imaging and image analysis, quantitative quality scores will be derived from the acquired images both during the image acquisition process on the microscope and during the image processing and analysis steps. Most of these scores will be assessed on individual images but will be part of the analysis feature vector associated with each image and passed through to the higher-level analysis. Higher-level assessment of quality scores over multiple images at the well, plate, or even whole experiment level will be done at that subsequent higher-level analysis step (detailed in the next section). In this way, both quality scores measured image-by-image and across multiple images can be used in the statistical and machine-learning determination what scores are relevant in assessing data quality throughout the pipeline.

The imaging QA/QC module will provide a rich set of measured values that assess different and independent parameters that may affect the quality of signatures derived from the image data. We plan to measure values in the categories: 1) image acquisition features reported by the image acquisition microscopy system such as empty fields, auto-focus failures, and stage motion drift; 2) whole image features measured by the CellProfiler software as described in Bray 2012, such as image focus, saturation, illumination artifacts, and gross contamination; 3) object-based features, reported by CellProfiler and in-house developed software routines that measure scene segmentation quality, cell density, and staining.

1. Image acquisition features, as described in Vaisberg 2006:

	a. Empty field: skewness of the image histogram in the DNA channel

	b. Auto-focus failure: distance of Z-position from expected in-focus position

	c. Stage motion drift: distance of cell spot image centroid from middle of image

2. Whole image features:

	a. Image focus: measured by PLLS, as described in Bray 2012

	b. Saturation: percent maximal values in any of the channels, described in Bray 2012

	c. Illumination artifact: divergence from flat background as described in Fuller 2010

	d. Gross contamination: percent of boundary pixels part of foreground structure

3. Object-based features:

	a. Segmentation quality: standard deviation of nuclear object size distribution

	b. Cell density: average inter-nuclear distance

	c. Staining: average object signal to background in each of the channels

Supervised machine learning techniques will be used to train a classifier on the parameters above to determine the acceptance gates. As needed additional parameters will be added to the metrics to detect all artifacts that confound reliable signature extraction.

### MEMA assay assessment

Our experience with MEMA QA/QC has identified several possible sources of variation, each of which will be thoroughly examined and assessed using Exploratory Data Analysis approaches. We will use custom-developed interactive R Shiny tools to display the as histograms, density plots, scatter plots, box plots and heat maps. 

1. All measured values will be selectively grouped by experimental factors such as well, pin, array position, and ME protein. For example:

	a. Pin variations can cause different amounts of reagent to be deposited. This can lead to varying numbers of cells adhering to the spots. Pin-to-pin variations will be detected by boxplots of cell counts.

	b. Regions of low cell count result from scouring when adding, removing or rocking the reagents and from varying plate surface. Low cell count regions will be detected by heatmaps of the arrays and boxplots of QA/QC: regions, rows and columns.

	c. Regions of uneven staining will be detected by heatmaps of cell level data. Evidence of spatial artifact will be assessed statistically, such as with a two-way ANOVA where the factors are intensity and row or column number.

2. Each plate will have a control MEP that will be printed ~6 times in spatially distributed locations throughout the array. We will calculate the coefficient of variation (CV) across these replicated to assess array quality. We will consider re-running plates with high CVs.

3. Quality data generated at the image level (focus, spectral content, etc.) will be analyzed for regions of poor quality, where regions are defined as contiguous spots of 2x2 or more spots. The regional threshold for passing the quality check will be more stringent than the per image threshold because a region of images that individually pass the quality check but are near the threshold indicate an array region of poor quality.

### Reverse Phase Protein Lysate (RPPA) Arrays

There are two key validation steps in the generation of RPPA data: antibody validation and assessment of assay performance, described below.

Antibody Validation. We extensively validate all antibodies nominated for use in RPPA. Antibodies are assessed for specificity, quantification and sensitivity (dynamic range) using protein extracts from cultured cells or tumor tissue. These antibodies specifically recognize proteins acting on multiple signaling pathways, including receptor tyrosine kinases, PI3K-AKT and MAPK cascades, LKB1-AMPK and TGFβ cascades, as well as cell cycle and apoptosis/autophagy regulators.

We use the following approach to validate antibodies used in the RPPA assay: a) require a single or dominant band on a western blot; b) determine dynamic range and specificity with peptides, growth factors, and inhibitors; c) assess cells with varied expression levels, including 330 cell lines under multiple conditions on a single array; d) require Pearson correlation coefficient between RPPA and western blotting > 0.70.

Assay Performance. We have defined a set of cell lysates, prepared in large quantity and designated as “Control Lysates”. We perform six technical replicates of these Control Lysates, spatially distributed throughout each RPPA slide to assess assay sensitivity, stability, and reproducibility. Control Lysates serve as a standard for batch variation adjustment. In addition, we have prepared a large quantity of “Mixed Lysate” from 32 cell lines. Serial dilutions of the Mixed Lysate are printed in 96 technical replicates on each slide, and serve as a standard for spatial correction and quality test in the program of “Supercurve Fitting” (http://bioinformatics.mdanderson.org/OOMPA) to determine relative protein concentration (Zhang, 2009; Hu, 2007). This fits a single curve using all the samples (i.e., dilution series) on a slide with the signal intensity as the response variable and the dilution steps as independent variables. The fitted curve is plotted with the signal intensitiesboth observed and fittedon the y-axis and the log2-concentration of proteins on the x-axis for diagnostic purposes. The protein concentrations of each set of slides are then normalized by median polish, which is corrected across samples by the linear expression values using the median expression levels of all antibody analyzed in a single study to calculate a protein loading correction factor for each sample.

The QC score from our quality test is used to indicate good (above 0.8) or poor (below 0.8) antibody staining. We exclude poorly stained slides from further data analysis. In addition, we included 30 unique individual cell line lysate on each set of RPPA assay, which function as an "anchor" for replicate-based-normalization (RBN) used in RPPA data merge.

Additionally, replicate control samples must demonstrate a correlation coefficient of 0.9 with previous slides stained with the same antibody or a new slide is stained and analyzed. Approximately 10% of the slides in any study are stained with duplicate antibodies and must demonstrate correlation coefficients of >0.9.

### L1000

Transcriptional profiles will be measured, quality-controlled, and analyzed using the Luminex L1000 platform under contract to the Broad. The data processing and QA/QC approach is detailed in the funded Broad LINCS proposal. We will use the freely available Matlab scripts (https://github.com/cmap/l1ktools) to process the Luminex data and interpolate genome-wide expression.

## List Cell Types/Names

Our MEP-LINCS center will elucidate the effects of microenvironmental perturbations on cancer and normal cells. In years 1 and 2, we will focus on a pan-cancer project that will coordinate the efforts of 4 centers (Gray, Sorger, Golub, and Jaffee). Together with these centers, we have nominated 5 common cancer cell lines, each of a different tissue of origin (see accompanying excel document). In subsequent years, we will focus on breast and pancreatic cancer cell lines.

## List of Perturbations

Our MEP-LINCS center will assay the cellular responses to ~3,000 microenvironment perturbagens (MEPs), where each MEP is defined as the combination of a soluble extracellular molecule and an insoluble growth factor. In the accompanying excel document we have listed the ~45 extracellular matrix proteins and ~65 growth factors we will use in our assays.

## List of Assays

Dataset 1: High-throughput microenvironment microarrays 

3 cell lines, ~3,000 MEPs, 3 antibody sets

Dataset 2: High-throughput microenvironment microarrays

## Metadata

We will adopt the metadata standards developed in LINCS Phase I for all relevant reagents categories: Antibodies, Proteins, Small Molecules, and Cell Lines. In all cases, we will capture the essential metadata fields. Additionally, we will work with the Sorger and Thompson/Finkbiner groups to develop metadata standards for imaging data.


# References

1. Bray MA, Fraser AN, Hasaka TP, Carpenter AE. Workflow and metrics for image quality control in large-scale high-content screens. J Biomol Screen. 17(2):135-143, 2012.

2. Fuller CJ, Straight AF. Image Analysis Benchmarking Methods for High-Content Screen Design. J. Microsc., 238, 145–161, 2010.

3. Hu, J. et al. Non-parametric quantification of protein lysate arrays. Bioinformatics 23, 1986-94, 2007.

4. Vaisberg EA, Lenzi D, Hansen RL, Keon BH, Finer JT. An Infrastructure for High-Throughput Microscopy: Instrumentation, Informatics, and Integration. Methods Enzymol. 414, 484–512, 2006.

5. Zhang, L. et al. Serial dilution curve: a new method for analysis of reverse phase protein array data. Bioinformatics 25, 650-4, 2009
3 cell lines, ~3,000 MEPs, 3 antibody sets
