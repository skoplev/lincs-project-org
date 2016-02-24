# Data

The LINCS Data and Signature Generation Centers (DSGCs) produce a variety of data for the library. For such data to be standardized, integrated, and coordinated in a manner that promotes consistency and allows comparison across different cell types, assays and conditions, the BD2K-LINCS DCIC together with the DSGCs develop and employ data standards.

Once collected, LINCS data is made available to the research community in various formats so that it can be used in different types of analyses.

The data standards page describes the data structures that are being developed by the LINCS Data Working Group.

The data releases page describes the collections of data released and planned to be released to the public by the LINCS consortia with instruction on how to access, download and cite it.

## Data Levels

The LINCS project embraces and aims to further develop the concept of data levels for results from the various assays employed within the LINCS consortia. During the first phase of the LINCS project the Broad and HMS teams defined data-levels for the results produced by the several assays they employed. The concept of data levels is also borrowed from the success of this approach by The Cancer Genome Atlas (TCGA) project. Definitions for data levels for all the LINCS assays are currently being developed by the BD2K-LINCS DCIC and the LINCS DSGCs and will be posted here soon.

The L1000 data-levels definitions can be found at: http://www.lincscloud.org/l1000/

The TCGA data-level definitions can be found here: https://tcga-data.nci.nih.gov/tcga/tcgaDataType.jsp

## Data release policy

### General principles

* LINCS Centers have been funded to create a public resource that makes it possible for members of the community to make new discoveries as rapidly as possible. We therefore agree to comply with the Fort Lauderdale Principles with respect to the dissemination and unrestricted re-use of LINCS data and signatures.

* Whenever a recognized long-term public repository exists for data generated by LINCS Centers (e.g NCBI, EBI, or other locations), these repositories will be used in addition to any LINCS-specific repository. Specific details including locations of the data, access to it, and any “requested” data use restrictions will be listed here on this data release policy page.

* Many of the types of data being generated by LINCS Centers (e.g. live and fixed-cell microscopy, multiplex biochemical assays, functional cellular phenotypes) have not yet been standardized and public repositories outside of LINCS for the data do not exist yet. To ensure that LINCS data are useful and interpretable the LINCS Centers are committed to developing and applying appropriate metadata standards, reagents registries etc. Whenever feasible, these will be based on existing or emerging community standards (e.g. OMERO for management of images and associated measurement metadata).

* LINCS Centers are concerned about data quality and reproducibility, particularly for types of data for which agreed upon standards do not yet exist. The Centers therefore commit to defining and applying appropriate QA/QC processes prior to data release. The QA/QC process used for each dataset will be released along with the data itself. In some cases, however, data are being generated for which the appropriate quality standards are not yet clear; users must therefore familiarize themselves with the QA/QC procedure applied to each data set and not over-interpret the results.

* Pilot experiment datasets when the assay is being optimized will likely not be released; failed experiments (or those carried out under non-optimal conditions as determined subsequently by QC) will also likely not be released.

## Release of LINCS data

* LINCS Centers will release primary and processed data on a quarterly basis as described on the data release page. LINCS data will be released as soon as logistically possible after QA/QC has been completed but not later than 3 months after QA/QC and no more than 6 months after data generation. It is anticipated however, that for a subset of LINCS data with less well established QA/QC standards (e.g. live cell imaging experiments) the generation of level 2&3 data will be part of the QA/QC process; in these cases the delay between data generation and data release will be longer. Regardless, the principle will be the same: timely release of data of sufficient quality that it is useful to the community at large. The concept of data levels is explained here and follows principles used in other projects like TCGA (The Cancer Genome Atlas).

* For some LINCS data types (e.g. L1000), data levels have already been established and quality assessment metrics exist. LINCS Centers will therefore conform to these standards. This includes all data defined by the National Institutes of Health (NIH) Genomic Data Sharing (GDS) Policy (genome-wide association studies (GWAS), single nucleotide polymorphisms (SNP) arrays, and genome sequence, transcriptomic, metagenomic, epigenomic, and gene expression data). LINCS Centers will follow all of the guidelines in the GDS policy with respect to human data.

* In general, LINCS data are released without any restrictions except correct citation. However, LINCS Centers may petition the NIH LINCS Project Team for permission to post data with a request that large-scale analysis not be performed on a dataset until a primary publication has been submitted; in no case will this “embargo” period be longer than 6 months. The BD2K-LINCS Data Coordination and Integration Center will track release dates and any requests for embargoes; potential users of LINCS data are encouraged to contact LINCS Centers if they wish to co-publish on embargoed data.

* Some LINCS data may be placed in a restricted private LINCS repository to serve as test data sets for public data analysis challenges. The nature of the challenge data (training and test) will be described on the Community page when the such challenges are established.

* All LINCS datatypes will have a suitable hierarchy defined from raw data, to processed data, to signatures. In this “data-level” hierarchy raw data is data level 1 and signatures the highest data level (typically data level 4). However, the number of data levels differs for different data types and the definitions are in active development. These data levels will be made available at the time the data are posted.

### Use of LINCS data

All investigators are encouraged, to publish results based on LINCS data. These results may include, but would not be limited to, integrating LINCS data with data from other sources. LINCS data are released with the sole restriction that they must be correctly cited so that others can establish provenance and access the original data; the correct citation will be released with each data set and will comprise either a PMID/PMCID reference or a unique LINCS identifier. Investigators are encouraged to inform the LINCS consortium of ongoing integrative analyses in order to minimize duplicative and competitive analyses groups. This information will also be available on the Community pages of the LINCS website.

## Data standards

### LINCS production phase 2 extended metadata standards

In LINCS Production Phase 2, the LINCS Data Working Group (DWG) is currently developing extended metadata specifications describing LINCS reagents, assays and experiments. Annotations for the perturbagens (small molecules, siRNA, growth factors and other ligands), cells, and some elements of experimental metadata should be common between all LINCS Centers. This will facilitate development of data analysis, formatting, and visualization strategies by LINCS investigators, and also the development of databases and data repositories in which to store and share LINCS data.

* Cell lines (Released 8-14-15)
* Primary cells (Released 8-14-15)
* iPSCs (Released 8-14-15)
* Differentiated iPSCs (Released 8-14-15)
* Small molecules (Released 8-14-15)
* RNAi reagents (Released 8-14-15)
* Antibody reagents (Released 8-14-15)
* Other reagents (Released 8-14-15)

### LINCS pilot phase 1 metadata standards

The documents below annotate reagents outside the context of the experiments in which they were used. For example, the small molecules standards do not include solvent information as that is usually specific to the experimental context in which the reagent is used. Please note that the ‘Unique ID’ field in these documents is used by the LINCS DWG to track fields and is not meant for any other purpose.

* Cell lines (Released 4-11-12)
* Primary cells (Released 4-11-12)
* Small molecules (Released 5-4-12)
* RNAi reagents (Released 7-31-12)
* Protein reagents (Released 7-31-12)
* Antibody reagents (Released 10-12-12)
* Other reagents (Released 11-7-12)

### Experimental metadata

The LINCS DWG will also develop standards to annotate the metadata that should be reported to describe LINCS assay protocols, data analysis strategies, and datasets. As much as possible we plan to make use of experimental metadata standards developed by other groups such as the ISA infrastructure project, the MIBBI efforts (e.g. MIACA, MIARE), and NCBI PubChem.